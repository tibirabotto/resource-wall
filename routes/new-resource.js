const express = require('express');
const router  = express.Router();
const categories = require('../db/queries/newResource');

router.get('/', (req, res) => {
  categories.getCategories()
    .then(categories => {
      let templateVars = { categories };
      console.log(categories);
      res.render('new_resource', templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  console.log('XYZ: ', req.body);
});

module.exports = router;
