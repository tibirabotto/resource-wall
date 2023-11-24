const express = require('express');
const router = express.Router();
const categoryQueries = require('../db/queries/categories');
const allResources = require('../db/queries/allResources');
const likedResources = require('../db/queries/resources');

router.get('/', async (req, res) => {
  try {
    const categories = await categoryQueries.getAllCategories();
    const resources = await allResources.getAllResources();

    let templateVars = {};
    // console.log(`Resources: ${JSON.stringify(resources)}`);
    resources.forEach(resource => {
      console.log(`Liked by: ${resource.liked_by}`);
    })
    if (req.session.username !== undefined) {
      let session = req.session;
      const newRes = await likedResources.likedResources(req.session.username);
      let result = [];

      for (let resource of newRes) {
        result.push(resource['resource_id']);
      }

      templateVars = { categories, resources, session, result };

      return res.render('index', templateVars);
    }
    templateVars = { categories, resources };
    return res.render('login', templateVars);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
