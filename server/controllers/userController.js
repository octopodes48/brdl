const { query } = require('express');
const db = require('../models/brdlModels');

const userController = {};

// client will provide username and password in the req.query
// we will query the db using just the username and get the password from the db. if the db provided password matches client provided password, set res.locals.auth = true
// else set res.locals.auth
userController.auth = async (req, res, next) => {
  const { username: clientUsername, password: clientPassword } = req.query;
  try {
    const queryString = 'SELECT * FROM Users WHERE username=$1';
    const queryResult = await db.query(queryString, [clientUsername]);
    if (!queryResult.rows.length || queryResult.rows[0].password !== clientPassword) {
      console.log(`Auth failed using username: ${clientUsername} and password: ${clientPassword}`);
      res.locals.auth = { valid: false };
      return next();
    } else {
      res.locals.auth = { valid: true, fullName: queryResult.rows[0].name };
      console.log(`Auth success using username: ${clientUsername} and password: ${clientPassword}`);
      return next();
    }
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
  const { fullName, username: clientUsername, password: clientPassword } = req.query;
  try {
    const queryCheckString = 'SELECT * FROM Users WHERE username=$1';
    const queryCheckResult = await db.query(queryCheckString, [clientUsername]);
    if (queryCheckResult.rows.length > 0) {
      console.log('query check result',queryCheckResult);
      res.locals.auth = { valid: false };
      console.log('username already exist');
      return next();
    } else {
      const queryString = 'INSERT INTO Users (name, username, password) VALUES ($1, $2, $3)';
      const queryResult = await db.query(queryString, [fullName, clientUsername, clientPassword]);
      res.locals.auth = { valid: true };
      console.log('account succcessfully made');
      console.log(queryResult);
      return next();
    }
  } catch (err) {
    return next({
      log: `Express error handler caught in userController.create: ${err.message}`,
      status: 500,
      message: { err: 'Express error handler caught in userController.create' },
    });
  }
};

module.exports = userController;
