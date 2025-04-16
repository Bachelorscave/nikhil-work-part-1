const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { AppError } = require('../utils/appError');

exports.protect = async (req, res, next) => {
  try {
    // 1) Get token from header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AppError('You are not logged in. Please log in to get access.', 401);
    }

    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new AppError('The user belonging to this token no longer exists.', 401);
    }

    // 4) Check if user is active
    if (user.status !== 'active') {
      throw new AppError('Your account is not active.', 401);
    }

    // Grant access to protected route
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

exports.verifyOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await Property.findByPk(id);

    if (!property) {
      throw new AppError('Property not found', 404);
    }

    if (property.ownerId !== req.user.id && req.user.role !== 'admin') {
      throw new AppError('You do not have permission to perform this action', 403);
    }

    next();
  } catch (error) {
    next(error);
  }
}; 