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
    
    // FOR TESTING PURPOSES: COOKIE MAX AGE IS 60 SECS UTC TIME
    res.cookie('ssid', `${res.locals.uuid.rows[0].sessionid}`, { maxAge: 60000, httpOnly: true, secure: true })

    console.log('it ran!!')
    return next();
  }

  cookieController.auth = async (req,res,next) => {
    console.log('got here')
    console.log('reqbody?', req.headers.cookie)

    if (req.headers.cookie) {

      console.log('in here?')
  
      const queryUuidString = 'SELECT * FROM sessions WHERE sessionid=$1'
      const queryUuidResult = await db.query(queryUuidString, [req.headers.cookie.slice(5)])
  
      console.log('success? maybe?', queryUuidResult)
  
      if (!queryUuidResult) res.locals.auth = { valid: false }
      else res.locals.auth = {valid: true, username: queryUuidResult.rows[0].username}
  
      return next()

    }
  }

  module.exports = cookieController