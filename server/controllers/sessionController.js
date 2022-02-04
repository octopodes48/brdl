const { query } = require('express');
const db = require('../models/brdlModels');



// BOO HISS LOL
const sessionController = {};



sessionController.startSession = async (req, res, next) => {
  console.log('local', res.locals)
  const queryString = 'INSERT INTO sessions (username) VALUES ($1)'
  const queryResult = await db.query(queryString, [res.locals.user.username])

  const queryUuidString = 'SELECT sessionid FROM sessions WHERE username=$1'
  const queryUuidResult = await db.query(queryUuidString, [res.locals.user.username])

  res.locals.uuid = queryUuidResult;

  console.log('sessionid', typeof res.locals.uuid.rows[0].sessionid)

  return next()
}

sessionController.loginSession = async (req, res, next) => {


  console.log('inside the loginSession')


  const queryUuidString = 'SELECT sessionid FROM sessions WHERE username=$1'
  const queryUuidResult = await db.query(queryUuidString, [res.locals.user.username])

  if (queryUuidResult) {
    const deleteUuidString = 'DELETE FROM sessions WHERE username=$1'
    const deleteUuidResult = await db.query(deleteUuidString, [res.locals.user.username])
  }

  const queryString = 'INSERT INTO sessions (username) VALUES ($1)'
  const queryResult = await db.query(queryString, [res.locals.user.username])

  const newUuidResult = await db.query(queryUuidString, [res.locals.user.username])

  res.locals.uuid = newUuidResult;

  console.log('loginSessions', res.locals.uuid.rows[0].sessionid)

  return next()


}

module.exports = sessionController;