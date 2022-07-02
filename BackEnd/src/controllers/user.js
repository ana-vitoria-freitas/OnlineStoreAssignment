'use strict';
const dbo = require('../db/connection');
const express = require('express');
const router = express.Router();


router.get('/user/:username', (req, res, next) => {

  const dbConnect = dbo.getDb();

  dbConnect
    .collection('users')
    .find({ username: req.params.username })
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching user!');
      } else {
        res.json(result);
      }
    });
});

router.post('/user', (req, res, next) => {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    address: req.body.address
  };

  dbConnect
    .collection('users')
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send({ result: "error" });
      } else {
        res.status(200).send({ result: "success" });
      }
    });
});

router.put('/user/:username', (req, res, next) => {
  const dbConnect = dbo.getDb();
  const user = req.params.username;
  const matchDocument = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    address: req.body.address
  };

  dbConnect
    .collection('users')
    .update({ username: user }, matchDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error updating user!');
      } else {
        console.log(`Updated a user with id ${result._id}`);
        res.status(200).send();
      }
    });
});

router.delete('/user/:username', (req, res, next) => {
  const dbConnect = dbo.getDb();


  dbConnect
    .collection('users')
    .deleteOne({ username: req.params.username }, (err, result) => {
      if (err) {
        res.status(400).send('Error deleting user!');
      } else {
        let json = result;
        if(json.deletedCount == 0){
          res.status(400).send("User not found");
        }else{
          res.status(200).send("user deleted successfully");
        }
      }
  });




});

module.exports = router;




