const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validate.middleware');
const { protect } = require('../middleware/auth.middleware');
const {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  getMe
} = require('../controllers/auth.controller');

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required'),
  validateRequest
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
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
  body('email').isEmail().normalizeEmail(),
  validateRequest,
  forgotPassword
);
router.post('/reset-password/:token', passwordValidation, resetPassword);
router.post('/change-password', 
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    ...passwordValidation
  ],
  validateRequest,
  changePassword
);
router.get('/me', protect, getMe);

module.exports = router; 