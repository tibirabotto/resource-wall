const express = require('express');
const router = express.Router();
const categoryQueries = require('../db/queries/categories');
const allResources = require('../db/queries/resources');

router.get('/:id', async(req, res) => {
  try {
    const categories = await categoryQueries.getAllCategories();
    const resource = await allResources.getResourceById(req.params.id);
    const comments = await allResources.getCommentsByResource(req.params.id);

    let templateVars = { categories, resource, comments };
    res.render('details', templateVars);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/comment', async(req, res) => {
  try {
    const resource = await allResources.addCommentByResource(req.body);
    console.log(resource);
    res.json({resource});
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
