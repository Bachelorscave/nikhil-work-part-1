const express = require('express');
const { body } = require('express-validator');
const ownerController = require('../controllers/owner.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
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
  body('phoneNumber')
    .optional()
    .matches(/^\+?[\d\s-]+$/)
    .withMessage('Please provide a valid phone number'),
  body('address')
    .optional()
    .isObject()
    .withMessage('Address must be an object')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const passwordValidation = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Public routes
router.post('/register', registerValidation, ownerController.register);
router.post('/login', loginValidation, ownerController.login);
router.get('/verify-email/:token', ownerController.verifyEmail);
router.post('/forgot-password', 
  body('email').isEmail().normalizeEmail(),
  ownerController.forgotPassword
);
router.post('/reset-password/:token', passwordValidation, ownerController.resetPassword);

// Protected routes
router.use(protect);
router.post('/change-password', 
  body('currentPassword').notEmpty(),
  passwordValidation,
  ownerController.changePassword
);
router.get('/me', ownerController.getMe);

module.exports = router; 