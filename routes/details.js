const express = require('express');
const router = express.Router();
const categoryQueries = require('../db/queries/categories');
const allResources = require('../db/queries/resources');

router.get('/:id', async(req, res) => {
  try {
    console.log(`IDDDDDDDD ${req.params.id}`);
    const categories = await categoryQueries.getAllCategories();
    const resource = await allResources.getResourceById(req.params.id);
    console.log(resource);
    let templateVars = { categories, resource };
    res.render('details', templateVars);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
