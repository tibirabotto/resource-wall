const express = require('express');
const router  = express.Router();
const myResources = require('../db/queries/myResources');
const categoryQueries = require('../db/queries/categories');
const likedResources = require('../db/queries/resources');

router.get('/', async (req, res) => {
  try {
    const categories = await categoryQueries.getAllCategories();

    let templateVars = {};
    if (req.session.username !== undefined) {
      let session = req.session;
      const resources = await myResources.getMyResources(req.session.username);
      const newRes = await likedResources.likedResources(req.session.username);
      let result = [];

      for (let resource of newRes) {
        result.push(resource['resource_id']);
      }
      templateVars = { categories, resources, session, result };

      return res.render('my_resources', templateVars);
    }
    templateVars = { categories, resources };
    return res.render('login', templateVars);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
