const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');
const upload = require('../middleware/upload');

// GET all plants
router.get('/', async (req, res) => {
  try {
    const { search, category, availability } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { categories: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (category && category !== 'All Categories') {
      filter.categories = { $in: [category] };
    }

    if (availability !== undefined) {
      filter.availability = availability === 'true';
    }

    const plants = await Plant.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: plants.length,
      data: plants
    });
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// POST new plant with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    
    // Check if req.body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        error: 'No form data received'
      });
    }

    // Safely extract data with default values
    const name = req.body.name || '';
    const price = req.body.price || '0';
    const categories = req.body.categories || '[]';
    const description = req.body.description || '';
    const stockCount = req.body.stockCount || '0';
    const availability = req.body.availability || 'true';

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Plant name is required'
      });
    }

    // Parse categories safely
    let parsedCategories = [];
    try {
      parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : categories;
    } catch (e) {
      parsedCategories = Array.isArray(categories) ? categories : [categories];
    }

    // Create image URL if file was uploaded
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
      console.log('Image saved as:', imageUrl);
    }

    // Create new plant
    const plantData = {
      name: name.trim(),
      price: Number(price),
      categories: parsedCategories,
      description: description.trim(),
      stockCount: Number(stockCount),
      availability: availability === 'true' || availability === true,
      image: imageUrl
    };

    console.log('Creating plant with data:', plantData);

    const plant = new Plant(plantData);
    const savedPlant = await plant.save();

    console.log('Plant saved successfully:', savedPlant);

    res.status(201).json({
      success: true,
      data: savedPlant,
      message: 'Plant added successfully'
    });

  } catch (error) {
    console.error('Error creating plant:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create plant'
    });
  }
});

module.exports = router;
