'use strict';
const dbo = require('../db/connection');
const express = require('express');
const router = express.Router();


router.post('/findUser', (req, res, next) => {

  const dbConnect = dbo.getDb();
  const matchDocument = {
    username: req.body.username,
    password: req.body.password,
  };

  dbConnect
    .collection('users')
    .find({$and: [{ username: matchDocument.username}, {password: matchDocument.password}]})
    .toArray(function (err, result) {
      if (result.length == 0) {
        res.status(400).send('Error fetching user!');
      } else {
        res.status(200).json(result);
      }
    });
});

router.post('/user', (req, res, next) => {
  const dbConnect = dbo.getDb();
  const matchDocument = {
    name: req.body.name,
    cpf: req.body.cpf,
    phone: req.body.phone,
    username: req.body.username,
    password: req.body.password,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    country: req.body.country,
    postal_code: req.body.postal_code,
    user_type: "client"
  };

  dbConnect
  .collection('users')
  .find({$or: [{ username: matchDocument.username}, {cpf: matchDocument.cpf}]})
  .toArray(function (err, result) {
    if (result.length == 0) {
      dbConnect
      .collection('users')
      .insertOne(matchDocument, function (err, result) {
        if (err) {
          res.status(400).send({ result: "error" });
        } else {
          res.status(200).send({ result: "success" });
        }
      });
    } else {
      res.status(400).json({result: "user already exists"});
    }
  });


});

router.put('/user/:username', (req, res, next) => {
  const dbConnect = dbo.getDb();
  const user = req.params.username;

  const matchDocument = {
    name: req.body.name,
    cpf: req.body.cpf,
    phone: req.body.phone,
    username: req.body.username,
    password: req.body.password,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    country: req.body.country,
    postal_code: req.body.postal_code,
  };  

  dbConnect
    .collection('users')
    .update({ username: user }, matchDocument, function (err, result) {
      if (err) {
        res.status(400).send('Error updating user!');
      } else {
        res.status(200).send();
      }
    });
});


module.exports = router;




