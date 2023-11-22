// load .env data into process.env
require('dotenv').config();

// Web server config
const cookieSession = require("cookie-session");
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');

const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');

const logoutRoutes = require('./routes/logout');
const loginRoutes = require('./routes/login');
const profileRoutes = require('./routes/profile');
const myResourceRoutes = require('./routes/my-resource');
const newResourceRoutes = require('./routes/new-resource');
const resourceRoutes = require('./routes/resource');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);

app.use('/users', usersRoutes);


app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/my-resources', myResourceRoutes);
app.use('/profile', profileRoutes);

app.use('/resource/new', newResourceRoutes);
app.use('/resource/:id', resourceRoutes);


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  if (req.session.email !== undefined) {
    const templateVars = { session: req.session };
    res.render('index', templateVars);
  } else {
    res.render("login.ejs");
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
