const { query } = require('express');
const db = require('../models/brdlModels');

const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
    // write code here

    // const username = res.locals.user.username
    // console.log("did I make it here?", username)
    // const queryString = 'SELECT * FROM Users'
    // const queryResult = await db.query(queryString)
    // console.log('queryResult', queryResult)
    res.cookie('ssid', res.locals.user.username, { httpOnly: true, secure: true })

    console.log('it ran!!', res.cookie)
    return next();
  }

  module.exports = cookieController