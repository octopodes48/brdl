const { query } = require('express');
const db = require('../models/brdlModels');
const axios = require('axios');
const tokens = require('../tokens/keys');

const birdController = {};

// GET -- client will provide { username: value, lat: value, long: value } in req.query
// respond with 10 birds in area { birds: [ { comBirdName: value, sciBirdName: value }, {...}, ... ],

birdController.nearby = async (req, res, next) => {
    const { username, lat, long } = req.query;
         // lat/long must be up to 2 decimal points
    try {
        const apiResponse = await axios.get(`https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${long}&maxResults=5`, {
            headers: { "x-ebirdapitoken": tokens.eBirdToken },
           })
        console.log(apiResponse);
        console.log(Object.keys(apiResponse));
        const newBirdList = apiResponse.data.map(bird => ({
            sciName: bird.sciName,
            comName: bird.comName,
            locName: bird.locName
        }))
        const seenQuery = 'SELECT scientific_name, time_stamp FROM "public"."seen_birds" WHERE username=$1';
        const seenResult = await db.query(seenQuery, [username]);
        res.locals.nearby = { birds: newBirdList, seenBirds: seenResult.rows };
        // INSERTING ONE BY ONE
        const queryString = `INSERT INTO Birds (scientific_name, common_name) VALUES ($1, $2) ON CONFLICT (scientific_name) DO NOTHING`;
        newBirdList.forEach(async function (bird) {
            try { await db.query(queryString, [bird.sciName, bird.comName]) }
            catch (err) {
                console.log('Cannot insert bird into Birds table');
                console.log(err.error);
            }
        })

        // INSERTING ALL AT ONCE IGNORE DUPLICATES (error- if bird name contains single quote, need to add escape character to ignore)
        // const queryStart = 'INSERT INTO Birds (scientific_name, common_name) VALUES ';
        // const queryMid = newBirdList.map(bird => {
        //     return `("${bird.sciName}", "${bird.comName}")`
        // }).join(', ');
        // const queryEnd = ' ON CONFLICT (scientific_name) DO NOTHING';
        // const queryString = queryStart + queryMid + queryEnd;
        // db.query(queryString)
        // .then(() => console.log('successfully added'));

        return next();
    } catch (err) {
        return next({
            log: `Express error handler caught in birdController.nearby: ${err.message}`,
            status: 500,
            message: { err: 'Express error handler caught in birdController.nearby' }
          })
     }
};

// POST -- when user clicks on a bird they have seen in the area, client will provide username, lat/long, timeStamp, commBirdName, sciBirdName
// query database to insert bird into the database
birdController.seen = async (req, res, next) => {
    console.log('in birdController', req.query);

    try {
        const { username, sciBirdName } = req.query;
        sciBirdName.split('_').join(' ');
        // check if the bird exists in birds table, if it doesn't insert into birds table
        const queryString = "SELECT * FROM Birds WHERE scientific_name=$1"
        const queryResult = await db.query(queryString, [sciBirdName]);
        if (!queryResult.rows.length) {
            const queryInsert = `INSERT INTO Birds (scientific_name, common_name) VALUES ($1, 'unknown')`
            await db.query(queryInsert, [sciBirdName]);
            console.log('BIRD ADDED TO TABLE')
        }
        // insert into the seen_bird table username, bird see, and time seen
        const querySeen = `INSERT INTO seen_birds (username, scientific_name, time_stamp) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING time_stamp`
        const seenResult = await db.query(querySeen, [username, sciBirdName]);
        const timeSeen = seenResult.rows[0].time_stamp;
        res.locals.seen = {sciName: sciBirdName, timeStamp: timeSeen} 
        return next()
    } catch (err) {
        return next({
            log: `Express error handler caught in birdController.seen: ${err.message}`,
            status: 500,
            message: { err: 'Express error handler caught in birdController.seen' }
        });
    }
};

birdController.leaders = async (req, res, next) => {
    
    try {
        const queryString = 'SELECT username, COUNT(*) AS seen FROM seen_birds GROUP BY username ORDER BY seen DESC LIMIT 5';
        const leaders = await db.query(queryString);
        res.locals.leaders = leaders.rows;
        return next();
    }
    catch (err) {
        return next({
            log: `Express error handler caught in birdController.leaders: ${err.message}`,
            status: 500,
            message: { err: 'Express error handler caught in birdController.leaders' }
        });
    }
}

//   const queryString = `INSERT INTO Birds (scientific_name, common_name) VALUES ($1, $2)`
// const queryResult = await db.query(queryString, [newBirdList.sciName,  ]);
// may need to insert 10 birds into db here, but will need to ensure scientific_name type is set to UNIQUE
// 

// DELETE -- when a user "unclicks" a bird they have seen, client will provide username, sciBirdName
// we will respond with T/F if bird was successfully deleted from database

module.exports = birdController;

