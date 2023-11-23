const express = require('express');
const router = express.Router();
const resourceQueries = require('../db/queries/resources');

router.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.query;
    const searchResults = await resourceQueries.searchResourcesInDB(searchQuery);
    res.json(searchResults);
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
