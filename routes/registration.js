const express = require('express');
const router  = express.Router();
const usersQueries = require('../db/queries/users');
router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  const { email } = req.body;
  usersQueries.addUser(req.body).then(user => {
    if (user) {
      req.session.email = email;
      res.redirect("/");
    } else {
      res.render("register", {message: 'Login/Password invalid'});
    }
  })
    .catch(err => {
      res.render("register", {message: err.message});
    });
});

module.exports = router;
