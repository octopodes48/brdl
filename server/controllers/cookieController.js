const { query } = require('express');
const db = require('../models/brdlModels');

const cookieController = {};

cookieController.setSSIDCookie = async (req, res, next) => {
    // write code here
    
    const queryCheckString = 'SELECT Session_id FROM Users WHERE username=$1'
    const queryResult = await db.query(queryString, [res.locals.user.username])

    res.cookie('ssid', `${queryResult}`, { httpOnly: true, secure: true })
    console.log('it ran!!', res.cookie)
    return next();
  }

  module.exports = cookieController