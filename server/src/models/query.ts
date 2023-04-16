import mongoose from 'mongoose';

interface Values {
  userId: string;
  adminId: string;
  templateId: string;
  projectId: string;
  message: string;
  content: string;
  driveLink: string;
  logo: string;
  status: string;
}

const querySchema = new mongoose.Schema<Values>(
  {
    userId: {
      type: String,
      required: true,
    },
    adminId: {
      type: String,
    },
    templateId: {
      type: String,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    driveLink: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'delivered'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const QUERY = mongoose.model('QUERY', querySchema);
