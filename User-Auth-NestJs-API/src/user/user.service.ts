import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { randomBytes } from 'crypto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { EmailService } from 'src/email/email.service';
import {
  PasswordReset,
  PasswordResetDocument,
} from 'src/schemas/passwordReset.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectModel(PasswordReset.name)
    private PasswordResetModel: Model<PasswordResetDocument>,
    private cloudinaryService: CloudinaryService,
    private emailService: EmailService,
  ) {}

  async addUser(user: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.UserModel(user);
      newUser.verificationToken = randomBytes(20).toString('hex');

      if (newUser.coverPic) {
        newUser.coverPic = (
          await this.cloudinaryService.convertImageToCloudinary(
            newUser.coverPic,
          )
        ).url;
      }
      if (newUser.profilePic) {
        newUser.profilePic = (
          await this.cloudinaryService.convertImageToCloudinary(
            newUser.profilePic,
          )
        ).url;
      }

      const savedUser = await newUser.save();

      this.emailService.sendVerificationEmail(
        savedUser.email,
        savedUser.id,
        savedUser.verificationToken,
      );

      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<User | undefined> {
    try {
      const user = await this.UserModel.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getByEmail(email: string): Promise<any> {
    try {
      const user = await this.UserModel.findOne({ email: email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async changeVerifyToTrue(userId: String) {
    try {
      const user = await this.UserModel.findById(userId);
      user.verified = true;
      return user.save();
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: string, user: UpdateUserDto): Promise<User> {
    try {
      const foundUser = await this.UserModel.findById(userId);
      foundUser.username = user.username || user.username;
      foundUser.password = user.password || user.password;
      if (foundUser.email !== user.email) {
        foundUser.email = user.email;
        foundUser.verified = false;
        this.emailService.sendVerificationEmail(
          user.email,
          userId,
          foundUser.verificationToken,
        );
      }

      if (user.coverPic && user.coverPic !== foundUser.coverPic) {
        foundUser.coverPic = (
          await this.cloudinaryService.convertImageToCloudinary(user.coverPic)
        ).url;
      }
      if (user.profilePic && user.profilePic !== foundUser.profilePic) {
        foundUser.profilePic = (
          await this.cloudinaryService.convertImageToCloudinary(user.profilePic)
        ).url;
      }
      return foundUser.save();
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<User> {
    try {
      const deletedUser = await this.UserModel.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  async createPasswordResetToken(userId: string) {
    try {
      const passwordReset = new this.PasswordResetModel();
      passwordReset.userId = userId;
      const savedToken = await passwordReset.save();
      return savedToken;
    } catch (error) {
      throw error;
    }
  }

  async verifyPasswordResetToken(userId, token) {
    const foundToken = await this.PasswordResetModel.findOne({ token, userId });
    return foundToken;
  }

  async deletePasswordResetToken(token) {
    const deletedToken = await this.PasswordResetModel.findOneAndDelete({
      token,
    });
    return deletedToken;
  }

  async changePassword(userId, password) {
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.password = password;
    return user.save();
  }
}
