require('dotenv').config();
const mongoose = require('mongoose');

const connect = async () => {
  // Add connection event listeners
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    
    // Test the connection with a simple query
    await mongoose.connection.db.admin().ping();
    console.log("Database ping successful");

    await runQueries();
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit();
  } catch (error) {
    console.error('Connection error:', error);
    process.exit(1);
  }
};

async function runQueries() {
  // Your database operations here
}

connect();