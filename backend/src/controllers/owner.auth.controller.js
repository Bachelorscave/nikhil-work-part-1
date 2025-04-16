const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Owner } = require('../models/owner.model');
const { sendEmail, getVerificationEmailTemplate, getPasswordResetEmailTemplate } = require('../utils/email');
const { AppError } = require('../utils/appError');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id, role: 'owner' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Register new owner
exports.register = async (req, res, next) => {
  try {
    const { 
      username, 
      email, 
      password, 
      fullName, 
      phoneNumber,
      businessName,
      businessAddress,
      businessLicense 
    } = req.body;

    // Check if owner already exists
    const existingOwner = await Owner.findOne({ 
      where: { 
        [Op.or]: [{ email }, { username }] 
      } 
    });
    
    if (existingOwner) {
      return next(new AppError('Email or username already registered', 400));
    }

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create owner
    const owner = await Owner.create({
      username,
      email,
      password,
      fullName,
      phoneNumber,
      businessName,
      businessAddress,
      businessLicense,
      verificationToken,
      verificationTokenExpires
    });

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/owner/verify-email/${verificationToken}`;
    await sendEmail({
      email: owner.email,
      subject: 'Email Verification - Bachelors Cave',
      message: getVerificationEmailTemplate(verificationUrl)
    });

    // Generate token
    const token = generateToken(owner.id);

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
    const { email, password } = req.body;

    // Check if owner exists
    const owner = await Owner.findOne({ where: { email } });
    if (!owner) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Check if email is verified
    if (!owner.isEmailVerified) {
      return next(new AppError('Please verify your email first', 401));
    }

    // Check if owner is active
    if (owner.status !== 'active') {
      return next(new AppError('Your account is not active', 401));
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
    const token = generateToken(owner.id);

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
      where: {
        verificationToken: token,
        verificationTokenExpires: { [Op.gt]: Date.now() }
      }
    });

    if (!owner) {
      return next(new AppError('Invalid or expired verification token', 400));
    }

    owner.isEmailVerified = true;
    owner.verificationToken = null;
    owner.verificationTokenExpires = null;
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

    const owner = await Owner.findOne({ where: { email } });
    if (!owner) {
      return next(new AppError('No owner found with that email', 404));
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    owner.passwordResetToken = resetToken;
    owner.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await owner.save();

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL}/owner/reset-password/${resetToken}`;
    await sendEmail({
      email: owner.email,
      subject: 'Password Reset - Bachelors Cave',
      message: getPasswordResetEmailTemplate(resetUrl)
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
      where: {
        passwordResetToken: token,
        passwordResetExpires: { [Op.gt]: Date.now() }
      }
    });

    if (!owner) {
      return next(new AppError('Invalid or expired reset token', 400));
    }

    owner.password = password;
    owner.passwordResetToken = null;
    owner.passwordResetExpires = null;
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
    const owner = await Owner.findByPk(req.user.id);

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
    const owner = await Owner.findByPk(req.user.id);
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