const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/error');
const authRoutes = require('./routes/auth.routes');
const ownerAuthRoutes = require('./routes/owner.auth.routes');
const ownerRoutes = require('./routes/owner.routes');
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/owner/auth', ownerAuthRoutes);
app.use('/api/owners', ownerRoutes);

// Error handling
app.use(errorHandler);

module.exports = app; 