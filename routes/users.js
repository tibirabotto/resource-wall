/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// Homepage
router.get('/', (req, res) => {
  res.render('index');
});

// Details page
router.get('/details', (req, res) => {
  res.render('details');
});

// Register page
router.get('/register', (req, res) => {
  res.render('register');
});



module.exports = router;
