const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Owner = require('../models/owner.model');
const { AppError } = require('./error');

// Protect routes middleware
exports.protect = async (req, res, next) => {
  try {
    // 1) Get token from header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in. Please log in to get access.', 401));
    }

    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if owner still exists
    const owner = await Owner.findById(decoded.id);
    if (!owner) {
      return next(new AppError('The owner belonging to this token no longer exists.', 401));
    }

    // 4) Check if owner changed password after the token was issued
    if (owner.passwordChangedAt && owner.passwordChangedAt.getTime() / 1000 > decoded.iat) {
      return next(new AppError('Owner recently changed password. Please log in again.', 401));
    }

    // Grant access to protected route
    req.user = owner;
    next();
  } catch (error) {
    next(new AppError('Authentication failed. Please log in again.', 401));
  }
};

// Restrict to specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
}; 