const express = require('express');
const router  = express.Router();
const authenticationQueries = require('../db/queries/authentication');


router.get('/', (req, res) => {
  res.render("login.ejs");
});

router.post('/auth', (req, res) => {
  const { email, password } = req.body;
  authenticationQueries.login(email, password)
    .then(user => {

      if (user) {
        res.render("index");
      } else {
        res.render("login");
      }

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;

