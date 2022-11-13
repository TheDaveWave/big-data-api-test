const express = require('express');
const pool = require('../modules/pool');
const url = require('url');
const router = express.Router();

router.get('/', (req, res) => {
    const reqUrl = url.parse(req.url, true);
    const coords = {lat: reqUrl.query.lat, lng: reqUrl.query.lng};
    // console.log(coords);
    const queryText = `SELECT * FROM "location" 
    ORDER BY ABS($1 - "lng"), ABS($2 - "lat")
    LIMIT 3;`;
    pool.query(queryText, [coords.lng, coords.lat])
        .then(response => {
        // console.log(response.rows);
        res.send(response.rows);
    })
    .catch(err => {
        console.log('Error in getting cities', err);
        res.sendStatus(500);
    });
});

// router.get('/', (req, res) => {
//     const queryText = `SELECT * FROM "location";`;
//     pool.query(queryText)
//     .then(response => {
//         console.log(response.rows);
//         res.send(response.rows);
//     })
//     .catch(err => {
//         console.log('Error in getting cities', err);
//         res.sendStatus(500);
//     });
// });

module.exports = router;