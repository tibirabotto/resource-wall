const express = require('express');
const router  = express.Router();


const authenticationQueries = require('../db/queries/authentication');
const usersQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  if (req.session.username !== undefined) {
    res.redirect("/");
  } else {
    res.render("login.ejs");
  }
});

router.post('/', async(req, res) => {
  const { email, password } = req.body;
  const username = await usersQueries.findByEmail(email);
  authenticationQueries.login(email, password)
    .then(user => {
      if (user) {
        req.session.username = username;
        res.redirect("/");
      } else {
        res.render("login", {message: 'Login/Password invalid'});
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
