const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  userQueries.login(email, password)
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
