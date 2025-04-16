const Owner = require('../models/Owner');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { AppError } = require('../middleware/error');
const crypto = require('crypto');
const { sendEmail, getVerificationEmailTemplate, getPasswordResetEmailTemplate } = require('../Utils/email');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Register new owner
exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, fullName, phoneNumber, address } = req.body;

    // Check if owner already exists
    const existingOwner = await Owner.findOne({ $or: [{ email }, { username }] });
    if (existingOwner) {
      return next(new AppError('Owner with this email or username already exists', 400));
    }

    // Create new owner
    const owner = new Owner({
      username,
      email,
      password,
      fullName,
      phoneNumber,
      address
    });

    // Generate verification token
    const verificationToken = owner.generateEmailVerificationToken();
    await owner.save();

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    await sendEmail({
      to: owner.email,
      subject: 'Email Verification - Bachelors Cave',
      html: getVerificationEmailTemplate(verificationUrl)
    });

    // Generate token
    const token = generateToken(owner._id);

    res.status(201).json({
      status: 'success',
      message: 'Registration successful. Please check your email for verification.',
      token,
      data: {
        owner: owner.toJSON()
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login owner
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if owner exists and password is included
    const owner = await Owner.findOne({ email }).select('+password');
    if (!owner) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Check if email is verified
    if (!owner.isEmailVerified) {
      return next(new AppError('Please verify your email first', 401));
    }

    // Check password
    const isPasswordValid = await owner.comparePassword(password);
    if (!isPasswordValid) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Update last login
    owner.lastLogin = new Date();
    await owner.save();

    // Generate token
    const token = generateToken(owner._id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        owner: owner.toJSON()
      }
    });
  } catch (error) {
    next(error);
  }
};

// Verify email
exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    const owner = await Owner.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!owner) {
      return next(new AppError('Invalid or expired verification token', 400));
    }

    owner.isEmailVerified = true;
    owner.emailVerificationToken = undefined;
    owner.emailVerificationExpires = undefined;
    await owner.save();

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Forgot password
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const owner = await Owner.findOne({ email });
    if (!owner) {
      return next(new AppError('No owner found with that email', 404));
    }

    // Generate reset token
    const resetToken = owner.generatePasswordResetToken();
    await owner.save();

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendEmail({
      to: owner.email,
      subject: 'Password Reset - Bachelors Cave',
      html: getPasswordResetEmailTemplate(resetUrl)
    });

    res.status(200).json({
      status: 'success',
      message: 'Password reset token sent to email'
    });
  } catch (error) {
    next(error);
  }
};

// Reset password
exports.resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const owner = await Owner.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!owner) {
      return next(new AppError('Invalid or expired reset token', 400));
    }

    owner.password = password;
    owner.passwordResetToken = undefined;
    owner.passwordResetExpires = undefined;
    await owner.save();

    res.status(200).json({
      status: 'success',
      message: 'Password reset successful'
    });
  } catch (error) {
    next(error);
  }
};

// Change password
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const owner = await Owner.findById(req.user.id).select('+password');

    // Check current password
    const isPasswordValid = await owner.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return next(new AppError('Current password is incorrect', 401));
    }

    owner.password = newPassword;
    await owner.save();

    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get current owner
exports.getMe = async (req, res, next) => {
  try {
    const owner = await Owner.findById(req.user.id);
    res.status(200).json({
      status: 'success',
      data: {
        owner: owner.toJSON()
      }
    });
  } catch (error) {
    next(error);
  }
}; 