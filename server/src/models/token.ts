import mongoose from 'mongoose';

interface Values {
  userId: string;
  email: string;
  token: string;
}

const tokenSchema = new mongoose.Schema<Values>(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Token = mongoose.model('Token', tokenSchema);

export default Token;
