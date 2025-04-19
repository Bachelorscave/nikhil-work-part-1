const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validate.middleware');
const { protect } = require('../middleware/auth.middleware');
const {
  updateProfile,
  getProfile,
  listProperties,
  addProperty,
  updateProperty,
  deleteProperty,
  getPropertyDetails
} = require('../controllers/owner.controller');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', [
  body('fullName').optional().trim().notEmpty().withMessage('Full name cannot be empty'),
  body('phoneNumber').optional().trim().notEmpty().withMessage('Phone number cannot be empty'),
  body('address').optional().trim().notEmpty().withMessage('Address cannot be empty'),
  validateRequest
], updateProfile);

// Property routes
router.get('/properties', listProperties);
router.post('/properties', [
  body('title').trim().notEmpty().withMessage('Property title is required'),
  body('description').trim().notEmpty().withMessage('Property description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('address').trim().notEmpty().withMessage('Property address is required'),
  body('amenities').isArray().withMessage('Amenities must be an array'),
  validateRequest
], addProperty);

router.get('/properties/:id', getPropertyDetails);
router.put('/properties/:id', [
  body('title').optional().trim().notEmpty().withMessage('Property title cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Property description cannot be empty'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('address').optional().trim().notEmpty().withMessage('Property address cannot be empty'),
  body('amenities').optional().isArray().withMessage('Amenities must be an array'),
  validateRequest
], updateProperty);

router.delete('/properties/:id', deleteProperty);

module.exports = router; 