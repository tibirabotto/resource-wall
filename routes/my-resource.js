const express = require('express');
const router  = express.Router();
const myResources = require('../db/queries/myResources');

router.get('/', (req, res) => {
  if(!users.userByEmail(req.session.email)) {
    res.status(500).json({ error: `Please Login to view this page!`});
  }

  const session = req.session;

  myResources.getMyResources()
    .then(resources => {
      console.log(resources);
      let templateVars = { resources, session };
      console.log(`TemplateVars: ${templateVars}`);
      res.render('my_resources', templateVars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
