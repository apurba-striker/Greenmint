// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const Plant = require('./models/Plant');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/plant-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected to:', mongoose.connection.name);
  console.log('🌍 Host:', mongoose.connection.host);
  
  // Count plants in connected database
  Plant.countDocuments().then(count => {
    console.log(`📦 Found ${count} plants in database`);
  });
})
.catch(err => console.error('❌ MongoDB connection error:', err));
// Routes

// Get all plants with search and filter
app.get('/api/plants', async (req, res) => {
  try {
    const { search, category, availability } = req.query;
    let query = {};
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { categories: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Category filter
    if (category && category !== 'all') {
      query.categories = { $in: [category] };
    }
    
    // Availability filter
    if (availability !== undefined) {
      query.availability = availability === 'true';
    }
    
    const plants = await Plant.find(query).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: plants.length,
      data: plants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// Add new plant (Admin)
app.post('/api/plants', [
  body('name').notEmpty().trim().withMessage('Plant name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('categories').isArray().withMessage('Categories must be an array'),
  body('availability').isBoolean().withMessage('Availability must be boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const plant = new Plant(req.body);
    await plant.save();
    
    res.status(201).json({
      success: true,
      data: plant,
      message: 'Plant added successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// Get plant categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Plant.distinct('categories');
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
