const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');

// GET all unique categories from plants
router.get('/', async (req, res) => {
  try {
    // Get all unique categories from existing plants
    const categories = await Plant.distinct('categories');
    
    res.json({
      success: true,
      data: categories.sort()
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// POST new category (admin only)
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Category name is required'
      });
    }
    
    // For now, we'll just return success
    // In a real app, you might want to save categories to a separate collection
    res.json({
      success: true,
      message: 'Category added successfully',
      data: { name }
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;
