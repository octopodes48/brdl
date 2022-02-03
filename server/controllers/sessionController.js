const { query } = require('express');
const db = require('../models/brdlModels');
// BOO HISS LOL
const sessionController = {};



sessionController.startSession = async (req, res, next) => {
  console.log('local', res.locals)
  const queryString = 'INSERT INTO sessions (username) VALUES ($1)'
  const queryResult = await db.query(queryString, [res.locals.user.username])
  return next()
}

module.exports = sessionController