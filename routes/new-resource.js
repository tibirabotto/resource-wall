const express = require('express');
const router  = express.Router();
const categories = require('../db/queries/newResource');
const users = require('../db/queries/users');

router.get('/', (req, res) => {
  console.log(`Session id: ${req.session}`);
  if(!users.userByEmail(req.session.email)) {
    res.status(500).json({ error: `Please Login to view this page!`});
  }
  for(let ele in req.session) {
    console.log(`${ele}: ${req.session[ele]}`);
  }
  categories.getCategories()
    .then(categories => {
      let templateVars = { categories };

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
