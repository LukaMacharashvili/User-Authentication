import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cloudinary from 'cloudinary';
import authRouter from './routes/auth.js'
import passport from './lib/passport/passport.js';
import session from 'cookie-session';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to DB'));

app.use(
    cors({
        origin: "https://user-auth-b4438.web.app"
    })
)

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})

app.use(helmet())
app.use(limiter)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

app.use(
    session({
      name: 'session',
      keys: [
        'a set',
        'of keys',
        'used',
        'to encrypt',
        'the session',
        'change in',
        'production',
      ],
      resave: false,
      saveUninitialized: true,
      sameSite: 'lax',
      maxAge: null,
    })
);

app.use(express.json({ limit: '25mb' }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter)

app.listen(PORT, () => console.log('Server Started!'))
