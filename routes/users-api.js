/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  // console.log(`Request: ${req.session.username}`);
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/username', (req, res) => {
  console.log(`Request: ${req.session.username}`);
  userQueries.findByUsername(req.session.username)
    .then(users => {
      console.log(`Inside users-api: ${typeof users}`);
      return res.json({ users }); // Note the 'return' here
    })
    .catch(err => {
      console.error('Error querying database:', err);
      return res
        .status(500)
        .json({ error: err.message }); // And also here
    });
});

module.exports = router;
