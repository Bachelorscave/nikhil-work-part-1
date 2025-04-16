const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  getMe
} = require('../controllers/owner.auth.controller');

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('fullName')
    .notEmpty()
    .withMessage('Full name is required'),
  body('businessName')
    .notEmpty()
    .withMessage('Business name is required'),
  body('businessAddress')
    .notEmpty()
    .withMessage('Business address is required'),
  validateRequest
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validateRequest
];

const passwordValidation = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  validateRequest
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', 
  body('email').isEmail().withMessage('Please provide a valid email'),
  validateRequest,
  forgotPassword
);
router.post('/reset-password/:token', passwordValidation, resetPassword);
router.post('/change-password', protect, passwordValidation, changePassword);
router.get('/me', protect, getMe);

module.exports = router; 