import mongoose from "mongoose";

const connection = {};

export const connectToDb = async () => {
    try {
        // Check if we already have an active connection
        if (connection.isConnected) {
            console.log('Using existing connection');
            return;
        }

        // Attempt to connect to MongoDB
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000, // Increase timeout
        });

        // Store the connection status
        connection.isConnected = db.connections[0].readyState;

        console.log('New connection established');
    } catch (err) {
        // Log the error and throw a new one
        console.error('Error connecting to database:', err);
        throw new Error(`Error connecting to database: ${err.message}`);
    }
};
