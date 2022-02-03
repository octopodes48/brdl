const { query } = require('express');
const db = require('../models/brdlModels');
// BOO HISS LOL
const sessionController = {};



sessionController.startSession = (req, res, next) => {
  const queryString = 'INSERT INTO seessions (name) VALUE ($1)'
  const queryResult = db.query(queryString, [res.locals.user.username])
}

module.exports = sessionController