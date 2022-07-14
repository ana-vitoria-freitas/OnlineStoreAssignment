'use strict';
const dbo = require('../db/connection');
const express = require('express');
const router = express.Router();

//ROTA QUE RETORNA OS DADOS DO USUARIO COM O USERNAME ESPECIFICADO  
router.get('/user/:username', (req, res, next) => {

  const dbConnect = dbo.getDb();

  dbConnect
    .collection('users')
    .findOne({ username: req.params.username}, function (err, result) {
      console.log(result)
      if (result.length == 0) {
        res.status(400).send('Error fetching user!');
      } else {
        res.send(result);
      }
    });
});

//ROTA QUE VERIFICA SE O USUÁRIO ESTÁ CASTRADO PARA LOGGAR NA PÁGINA
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
        console.log(result)
        res.status(200).json(result);
      }
    });
});

//ROTA QUE CRIA NOVO USUÁRIO, CASO SEU CPF E SEU EMAIL AINDA NAO ESTEJAM CADASTRADOS
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
    user_type: "user"
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

//ROTA QUE ATUALIZA CADASTRO DO USUÁRIO
router.put('/user/:username', (req, res, next) => {
  const dbConnect = dbo.getDb();
  const user = req.params.username;
  console.log(user)
  console.log(req.body);

  const matchDocument = {
    name: req.body.name,
    cpf: req.body.cpf,
    phone: req.body.phone,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    postal_code: req.body.postal_code,
    username: req.body.username
  };  

  dbConnect
    .collection('users')
    .updateOne({ username: user }, {$set: matchDocument}, function (err, result) {
      if (err) {
        res.status(400).send('Error updating user!');
      } else {
        res.status(200).send();
      }
    });
});

//ROTA QUE TRANSORMA USUÁRIO COMUM EM ADMIN
router.put('/user/admin/:username', (req, res, next) => {
  const dbConnect = dbo.getDb();
  const user = req.params.username;

  const matchDocument = {
    user_type: "admin"
  };  

  dbConnect
    .collection('users')
    .update({ username: user }, {$set : matchDocument}, function (err, result) {
      if (err) {
        res.status(400).send('Error updating user!');
      } else {
        res.status(200).send();
      }
    });
});


module.exports = router;




