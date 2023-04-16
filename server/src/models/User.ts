import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      min: 5,
    },
    roll: {
      type: String,
      enum: ['user', 'admin', 'superAdmin'],
      default: 'user',
    },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', UserSchema);
