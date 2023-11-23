const express = require('express');
const router = express.Router();
const resourceQueries = require('../db/queries/resources'); // Import the resource queries module

router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
    let resources;

    if (category === 'all') {
      // Fetch all resources
      resources = await resourceQueries.getAllResources();
    } else {
      // Fetch resources for the specified category
      resources = await resourceQueries.getResourcesByCategory(category);
    }

    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', (req, res) => {
  res.render('details');
});

router.get('/new', (req, res) => {
  res.render('details');
});
module.exports = router;

