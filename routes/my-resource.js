const express = require('express');
const router  = express.Router();
const myResources = require('../db/queries/myResources');
const users = require('../db/queries/users');

router.get('/', (req, res) => {
  if(!users.userByEmail(req.session.email)) {
    res.status(500).json({ error: `Please Login to view this page!`});
  }

  const session = req.session;

  myResources.getMyResources(req.session.username)
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
