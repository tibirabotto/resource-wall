const express = require('express');
const router  = express.Router();
const myResources = require('../db/queries/myResources');
const users = require('../db/queries/users');
const categoryQueries = require('../db/queries/categories');

router.get('/', async (req, res) => {
  try {
    const categories = await categoryQueries.getAllCategories();
    const resources = await myResources.getMyResources(req.session.username);

    let templateVars = {};
    if (req.session.username !== undefined) {
      let session = req.session;
      templateVars = { categories, resources, session };
      console.log(`Inside myresource: ${JSON.stringify(templateVars)}`);
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
