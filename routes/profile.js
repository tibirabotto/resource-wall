const express = require('express');
const router  = express.Router();
const usersQueries = require('../db/queries/users');

router.get('/:username', async(req, res) => {
  if (req.session.username !== undefined) {
    try {
      const user = await usersQueries.findByUsername(req.params.username);
      res.render("update_profile.ejs", {user, session: req.session});
    } catch (e) {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
});

router.post('/', async(req, res) => {
  if (req.session.username !== undefined) {
    try {
      const response = await usersQueries.updateUser(req.body,req.session.username);
      console.log(response);
      if (response) {
        res.redirect("/");
      } else {
        res.render("update_profile.ejs", {user: req.body, session: req.session, message: "Error"});
      }
    } catch (e) {
      res.render("update_profile.ejs", {user: req.body, session: req.session, message: e.message});
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
