'use strict';
const dbo = require('../db/connection');
const express = require('express');
const router = express.Router();

router.get('/management', (req, res, next) => {

    const dbConnect = dbo.getDb();

    dbConnect
        .collection('users')
        .find({})
        .toArray(function (err, result) {
            console.log(result)
            if (result.length == 0) {
                res.status(400).send('Error fetching products!');
            } else {
                res.send(result);
            }
        });
});

router.delete('/management/:username', (req, res, next) => {

    const dbConnect = dbo.getDb();


    dbConnect
        .collection('users')
        .deleteOne({username: req.params.username}, function (err, result) {
            if (err) {
                res.status(400).send('Error fetching products!');
            } else {
                res.send(result);
            }
        });
});



module.exports = router;