import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
  let uri = process.env.MONGODB_URI;

  // Automatically clean up duplicate prefixes if pasted by mistake
  if (uri && uri.includes('MONGODB_URI=')) {
    uri = uri.replace(/^.*MONGODB_URI=\s*"?/, '').replace(/"$/, '');
  }

  if (!uri) {
    console.error('MONGODB_URI is not set in .env file. Falling back to local MongoDB.');
    uri = 'mongodb://127.0.0.1:27017/codeorbit';
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error(`Primary MongoDB connection notice: ${err.message}`);
    // If primary Atlas connection fails (e.g. bad auth or network), fallback to local MongoDB without crashing nodemon
    if (!uri.includes('127.0.0.1') && !uri.includes('localhost')) {
      console.log('Attempting connection to local MongoDB (mongodb://127.0.0.1:27017/codeorbit)...');
      try {
        await mongoose.connect('mongodb://127.0.0.1:27017/codeorbit');
        console.log('Local MongoDB connected successfully (fallback mode)');
      } catch (localErr) {
        console.error('Local MongoDB connection also failed:', localErr.message);
      }
    }
  }
}
