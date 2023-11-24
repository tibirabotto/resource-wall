const express = require('express');
const router = express.Router();
const categoryQueries = require('../db/queries/categories');
const allResources = require('../db/queries/allResources');

router.get('/', async (req, res) => {
  try {
    const categories = await categoryQueries.getAllCategories();
    const resources = await allResources.getAllResources();
    const session = req.session;
    let templateVars = { categories, resources, session };
    res.render('index', templateVars);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
