import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://chanmeetsinghsahni:NVWHTMeHfBsGUg2I@snucket.opajfux.mongodb.net/?retryWrites=true&w=majority&appName=snucket';

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
