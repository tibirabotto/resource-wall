const express = require('express');
const router = express.Router();
const categoryQueries = require('../db/queries/categories');

router.get('/', async (req, res) => {
  try {
    const categories = await categoryQueries.getAllCategories();
    console.log({ categories });
    res.render('index', { categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
