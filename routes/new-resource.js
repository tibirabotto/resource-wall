const express = require('express');
const router  = express.Router();
const newResource = require('../db/queries/newResource');
const myResources = require('../db/queries/myResources');
const users = require('../db/queries/users');

router.get('/', (req, res) => {
  if(!users.userByEmail(req.session.email)) {
    return res.send('Please login to view this page'); // TODO - Error page
  }

  newResource.getCategories()
  .then(categories => {
      const session = req.session;
      let templateVars = { categories, session };

      res.render('new_resource', templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  console.log('XYZ: ', req.body);
  if(!users.userByEmail(req.session.email)) {
    return res.send('Please login to view this page'); // TODO - Error page
  }

  let templateVars = {};
  let user_id = 0;
  let title = '';
  let description = '';
  let url = '';
  let category_id = 0;
  let image = '';

  users.userByEmail(req.session.email)
  .then(function(data){
    // console.log('Stringify data.id: ', JSON.stringify(data));
    console.log('data.id: ', data[0].id);
    // console.log(`sessoinID: ${req.session.id}`);
    user_id = data[0].id;
    title = req.body.title;
    description = req.body.description;
    url = req.body.url;
    category_id = req.body.category;
    images_url = req.body.images_url;

    console.log(`Line 53! ${user_id}, ${title}, ${description}, ${url}, ${category_id}`);
    newResource.setResource(user_id, category_id, title, description, url, images_url)
    .then(data => {
      console.log(`Line 59: ${JSON.stringify(data)}`);
      if (data[0].id) {
        myResources.getMyResources()
        .then(resources => {
            const session = req.session;
            templateVars = { resources, session };
            // $.ajax({
            //   method: 'GET',
            //   url: '/my-resources'
            // })
            // .then(data => console.log(`Success on new resource: ${JSON.stringify(data)}`))
            // .catch(err => console.log(`Cannot get myresource page`))
            res.redirect('../my-resources');
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      }
    })
  })
  .catch(err => console.log(`Error getting data line 36: ${err.message}`));
});

module.exports = router;
