const express = require('express');
const router  = express.Router();
const myResources = require('../db/queries/myResources');

router.get('/', (req, res) => {
  myResources.getMyResources()
    .then(resources => {
      console.log(resources);
      let templateVars = { resources };
      console.log(`TemplateVars: ${templateVars}`);
      res.render('my_resources', templateVars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
  // res.render('my_resources');
});

module.exports = router;
