const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: [true, 'Property must belong to an owner']
  },
  title: {
    type: String,
    required: [true, 'Property must have a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Property must have a description'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Property must have a price'],
    min: [0, 'Price cannot be negative']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    zipCode: {
      type: String,
      required: [true, 'ZIP code is required'],
      trim: true
    }
  },
  amenities: [{
    type: String,
    trim: true
  }],
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: String
  }],
  status: {
    type: String,
    enum: ['available', 'rented', 'maintenance'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for efficient queries
propertySchema.index({ owner: 1, status: 1 });
propertySchema.index({ 'address.city': 1, 'address.state': 1 });
propertySchema.index({ price: 1 });

// Virtual for property rating
propertySchema.virtual('rating', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'property',
  justOne: false
});

// Pre-save middleware to update the updatedAt field
propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to check if property is available
propertySchema.methods.isAvailable = function() {
  return this.status === 'available';
};

// Static method to find available properties
propertySchema.statics.findAvailable = function() {
  return this.find({ status: 'available' });
};

const Property = mongoose.model('Property', propertySchema);

module.exports = Property; 