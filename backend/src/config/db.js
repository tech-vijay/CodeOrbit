import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('FATAL ERROR: MONGODB_URI is not set in .env file.');
    process.exit(1); // Exit the process with a failure code
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB Atlas connected');
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1); // Exit the process if connection fails
  }
}
