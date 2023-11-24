/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const likedResource = require('../db/queries/likedResource');

router.get('/', (req, res) => {
  likedResource.likedResource(req.query.bool, req.query.user_id, req.query.resource_id)
    .then(data => {
      const widgets = data;
      res.json({ widgets });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
