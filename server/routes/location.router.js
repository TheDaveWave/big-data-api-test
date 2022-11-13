const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "location";`;
  pool.query(queryText)
  .then(response => {
    console.log(response.rows);
    res.send(response.rows);
  })
  .catch(err => {
    console.log('Error in getting cities', err);
    res.sendStatus(500);
  });
});

module.exports = router;