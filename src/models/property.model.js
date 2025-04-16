const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Property description is required'],
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: [true, 'Property must belong to an owner']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    zipCode: {
      type: String,
      required: [true, 'Zip code is required']
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      default: 'USA'
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  deposit: {
    type: Number,
    required: [true, 'Deposit amount is required'],
    min: [0, 'Deposit cannot be negative']
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'room', 'studio', 'other'],
    required: [true, 'Property type is required']
  },
  amenities: [{
    type: String,
    enum: [
      'wifi', 'parking', 'laundry', 'kitchen', 'air_conditioning',
      'heating', 'tv', 'furnished', 'gym', 'pool', 'security',
      'elevator', 'balcony', 'patio', 'yard', 'storage'
    ]
  }],
  rules: [{
    type: String
  }],
  images: [{
    url: String,
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  availability: {
    type: String,
    enum: ['available', 'rented', 'maintenance', 'reserved'],
    default: 'available'
  },
  moveInDate: {
    type: Date
  },
  leaseTerm: {
    type: Number, // in months
    required: [true, 'Lease term is required'],
    min: [1, 'Lease term must be at least 1 month']
  },
  maxOccupants: {
    type: Number,
    required: [true, 'Maximum number of occupants is required'],
    min: [1, 'Maximum occupants must be at least 1']
  },
  genderPreference: {
    type: String,
    enum: ['male', 'female', 'any'],
    default: 'any'
  },
  agePreference: {
    min: {
      type: Number,
      min: 18
    },
    max: {
      type: Number
    }
  },
  smokingAllowed: {
    type: Boolean,
    default: false
  },
  petsAllowed: {
    type: Boolean,
    default: false
  },
  petDetails: {
    type: String
  },
  utilities: {
    included: [{
      type: String,
      enum: ['electricity', 'water', 'gas', 'internet', 'trash']
    }],
    details: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'deleted'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for search functionality
propertySchema.index({ 
  'address.city': 1, 
  'address.state': 1, 
  price: 1, 
  propertyType: 1,
  availability: 1
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property; 