require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// MongoDB Connection Options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Connect to MongoDB with more detailed error handling
console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    // Start server
    const PORT = process.env.PORT || 5000;
    const HOST = '0.0.0.0'; // Listen on all network interfaces
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
      console.log(`You can connect to this server from Cursor using: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    process.exit(1);
  }); 