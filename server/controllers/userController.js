const { query } = require('express');
const db = require('../models/brdlModels');
const bcrypt = require('bcrypt');

const userController = {};

// client will provide username and password in the req.query
// we will query the db using just the username and get the password from the db. if the db provided password matches client provided password, set res.locals.auth = true
// else set res.locals.auth
userController.auth = async (req, res, next) => {
  let { username: clientUsername, password: clientPassword } = req.query;
  // console.log(req.query.password)
  
  

  try {
    console.log('did it go in here', clientPassword)

    const queryString = 'SELECT * FROM Users WHERE username=$1';
    const queryResult = await db.query(queryString, [clientUsername]);

    console.log(queryResult.rows[0].password, clientPassword)

    // NEED TO QUERY DATABASE FIRST TO OBTAIN USER PASSWORD, THEN COMPARE WITH BCRYPT
    bcrypt.compare(clientPassword, queryResult.rows[0].password, (err, isMatch) => {
      if (err) return next({
        log: 'ERROR with bcrypt.compare'
      })
      else if (!isMatch) {
      console.log('NO MATCH')
      console.log(`Auth failed using username: ${clientUsername} and password: ${clientPassword}`);
      res.locals.auth = { valid: false };
      res.locals.user = {username: clientUsername}
      return next();
      }
      else {
        console.log('MATCH')
        res.locals.auth = { valid: true, fullName: queryResult.rows[0].name };
        console.log(`Auth success using username: ${clientUsername} and password: ${clientPassword}`);
        console.log('Successfully logged in.');
        res.locals.user = {username: clientUsername}
        return next();
      }
    })


  } catch (err) {
    return next({
      log: `Express error handler caught in userController.auth: ${err.message}`,
      status: 500,
      message: { err: 'Express error handler caught in userController.auth' },
    });
  }
};



// client will provide a unique username and a password in req.query
// we will query database with both the username and password. If the db does not contain username, it will store the username and password and set res.locals.auth = true
// else set res.locals.auth to false if username already exists
userController.create = async (req, res, next) => {
  console.log('in usercontroller create');
  // console.log('req.query', req.query)
  let { fullName, username: clientUsername, password: clientPassword } = req.query;
    // $1: fullName, $2: username: clientUsername, $3: password: clientPassword
  try {
    const queryCheckString = 'SELECT * FROM Users WHERE username=$1';
    const queryCheckResult = await db.query(queryCheckString, [clientUsername]);
    if (queryCheckResult.rows.length > 0) {
      // console.log('query check result',queryCheckResult);
      res.locals.auth = { valid: false };
      console.log('username already exist');
      return next();
    } else {
      const saltRounds = 15;
        // console.log('got here?')
      const hashPW = await bcrypt.hash(clientPassword, saltRounds)
        
      clientPassword = hashPW

      const queryString = 'INSERT INTO Users (name, username, password) VALUES ($1, $2, $3)';
      const queryResult = await db.query(queryString, [fullName, clientUsername, clientPassword]);
   
      
      res.locals.auth = { valid: true };
      console.log('account successfully made');
      res.locals.user = {username: clientUsername}
      return next();
    }
  }
  catch (err) {
    return next({
      log: `Express error handler caught in userController.create: ${err.message}`,
      status: 500,
      message: { err: 'Express error handler caught in userController.create' },
    });
  }
};

module.exports = userController;
