const path = require('path'),
  express = require('express'),
  PORT = 3000,
  app = express();
  
const cookieParser = require('cookie-parser');


const userController = require('./controllers/userController');
const geoController = require('./controllers/geoController');
const birdController = require('./controllers/birdController');
const cookieController = require('./controllers/cookieController')
const sessionController = require('./controllers/sessionController')

app.use(express.json()); // replaces body-parser
app.use(express.urlencoded({ extended: true })); // Helps parse different data types





// handle GET & POST requests to /gainAccess

// Login route
// middleware will return a boolean.
// if false, res.send('Login credentials are invalid')
// else, direct user to the profile page
app.get('/gainAccess', userController.auth, (req, res) => {
  res.set('Access-Control-Allow-Origin', ' * ');
  res.set('Content-Type', 'application/json');

  res.status(200).json(res.locals.auth);
});

app.use(cookieParser());


// Account creation
// mw will return a boolean
// if false, res.send('Account creation failed')
// else, direct user to profile page
app.post('/gainAccess',
  userController.create,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
  res.set('Access-Control-Allow-Origin', ' * ');
  res.set('Content-Type', 'application/json');
  // res.set('header')
  // res.setHeader('Set-Cookie', 'cookie=value');
  
  // res.cookie('ssid', res.locals.rows[0].sessionid, {httpOnly: true, secure: true})
  return res.status(200).json(res.locals.auth);
});

// User profile - get local birds in current area
// client will send a GET request to /profile with { username: value, lat: value, long: value }
// for 10 birds, mw will return { birds: [{sciName: "", locName: ""}, {...}]}
app.get('/profile', birdController.nearby, (req, res) => {
  res.set('Access-Control-Allow-Origin', ' * ');
  res.set('Content-Type', 'application/json');

  res.status(200).json(res.locals.nearby);
});

app.post('/profile', birdController.seen, (req,res) => {
  // res.set('Access-Control-Allow-Origin', ' http://localhost:3000 ');
  res.set('Content-Type', 'application/json');
  
  res.status(200).json(res.locals.seen);
})

// Local error handler (404/missing routes)
app.use('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', ' * ');
  res.set('Content-Type', 'application/json');

  res.status(404).send('PAGE NOT FOUND!!!');
});
// Global error handler (middleware errors)
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'Express error handler caught unknown middleware error' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);

  // res.set('Access-Control-Allow-Origin', ' http://localhost:3000 ');
  res.set('Content-Type', 'application/json');

  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, err => {
  if (err) console.log(err);
  else console.log('Server listening on PORT', PORT);
});

module.exports = app;
