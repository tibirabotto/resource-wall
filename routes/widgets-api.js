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
  console.log('Params:', req.query.bool, req.query.user_id, req.query.resource_id);
  likedResource.likedResource(req.query.bool, req.query.user_id, req.query.resource_id)
    .then(data => {
      console.log(`DAta from likes: ${JSON.stringify(data)}`);
      return res.json({ data });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
