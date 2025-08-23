// models/Plant.js
const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true // For faster search queries
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  categories: [{
    type: String,
    required: true,
    enum: ['Indoor', 'Outdoor', 'Succulent', 'Air Purifying', 'Home Decor', 
           'Low Maintenance', 'Flowering', 'Medicinal', 'Hanging', 'Desktop']
  }],
  availability: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: '/images/default-plant.jpg'
  },
  description: {
    type: String,
    trim: true
  },
  stockCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Text index for efficient search
plantSchema.index({ 
  name: 'text', 
  categories: 'text',
  description: 'text' 
});

module.exports = mongoose.model('Plant', plantSchema);
