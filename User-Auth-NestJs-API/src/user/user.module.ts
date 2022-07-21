import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { EmailModule } from 'src/email/email.module';
import {
  PasswordReset,
  PasswordResetSchema,
} from 'src/schemas/passwordReset.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: PasswordReset.name, schema: PasswordResetSchema },
    ]),
    CloudinaryModule,
    EmailModule,
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
