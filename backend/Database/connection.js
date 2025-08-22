import mongoose from 'mongoose';
import logger from '../Utils/logger.js';

const MAX_RETRIES = 5;
let retryCount = 0;

export const connectDB = async (uri) => {
  try {
    if (!uri) throw new Error('MongoDB URI is not defined.');

    await mongoose.connect(uri)
    .then((res)=>{
      console.log("mongodb connected successfully!");
    }).catch(err=>{
      console.log(err);
    });
    // === MongoDB Event Listeners ===
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected.');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected.');
    });

    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB error: ${err.message}`);
    });

  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);

    if (retryCount < MAX_RETRIES) {
      retryCount++;
      logger.warn(`Retrying MongoDB connection (${retryCount}/${MAX_RETRIES}) in 5 seconds...`);
      setTimeout(() => connectDB(uri), 5000);
    } else {
      logger.error('Max retries reached. Could not connect to MongoDB.');
      process.exit(1);
    }
  }
};


