'use strict';
const dbo = require('../db/connection');
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();


//ROTA QUE RETORNA CARRINHO DE UM USUÁRIO
router.get('/cart/:username', (req, res, next) => {

    const dbConnect = dbo.getDb();

    dbConnect
        .collection('carts')
        .findOne({username: req.params.username}, function (err, result) {
            console.log(err, result)
            if(err || !result || result.length == 0){
                res.status(404).send();
            }else{

                res.status(200).send(result);
            }
        });
});

//ROTA QUE REMOVE UM PRODUTO DO CARRINHO
router.put('/cart/product/:product_name/:username', (req, res, next) => {
    const dbConnect = dbo.getDb();

    const product = String(req.params.product_name).replace(/[0-9]/g, ' ');
    console.log(product);

    dbConnect
    .collection('carts')
    .updateOne({$and: [{username: req.params.username}, {products: {$elemMatch: {name: product}}}]}, {$pull: {products: {name : product}}}, function (err, result) {
        console.log(result)
      if (err) {
        res.status(400).send('Error updating user!');
      } else {
        res.status(200).send();
      }
    });
})


//ROTA QUE REMOVE TUDO DO CARRINHO
router.delete('/cart/product/:username', (req, res, next) => {
    const dbConnect = dbo.getDb();

    dbConnect
    .collection('carts')
    .deleteOne({username: req.params.username}, function (err, result) {
      if (err) {
        res.status(400).send('Error updating user!');
      } else {
        res.status(200).send();
      }
    });
})

//ROTA QUE CRIA CARRINHO DE USUÁRIO
router.post('/cart', (req, res, next) => {

    const dbConnect = dbo.getDb();
    const matchDocument = {
        username: req.body.username,
        products: req.body.products
    };


    dbConnect
        .collection('carts')
        .insertOne(matchDocument, function (err, result) {
            if (err) {
                res.status(400).send({ result: "error" });
            } else {
                res.status(200).send({ result: "success" });
            }
        });
});

//ROTA QUE ADICIONA PRODUTO NO CARRINHO
router.put('/cart/product', (req, res, next) => {


    const dbConnect = dbo.getDb();
    const product_id = req.body.product_id;
    const owner_username = req.body.username;

    console.log(product_id);
    console.log(owner_username);
    
    dbConnect
    .collection('carts')
    .findOne({$and: [{username: owner_username}, {products: {$elemMatch: {name: product_id}}}]}, function (err, result) {
        if(result == null){ //PRIMEIRA VEZ QUE O PRODUTO ESTÁ SENDO INSERIDO
            const document = {
                "name": product_id,
                "quantity": 1
            };

            dbConnect
            .collection('carts')
            .updateOne({username: owner_username}, {$push: {products: document}}, function (err, result) {
                console.log(result)
              if (err) {
                res.status(400).send('Error updating user!');
              } else {
                res.status(200).send();
              }
            });

        }else{ //O PRODUTO JÁ ESTÁ INSERIDO
            dbConnect
            .collection('carts')
            .updateOne({$and: [{username: owner_username}, {products: {$elemMatch: {name: product_id}}}]}, {$inc: {"products.$.quantity" : 1}}, function (err, result) {
                console.log(result)
              if (err) {
                res.status(400).send('Error updating user!');
              } else {
                res.status(200).send();
              }
            });
        }
    });
    

});

//ROTA QUE ADICIONA X PRODUTOS NO CARRINHO
router.put('/cart/product/:product_name/:username/:quantity', (req, res, next) => {
    const dbConnect = dbo.getDb();

    const owner_username = req.params.username;
    const product_id = String(req.params.product_name).replace(/[0-9]/g, ' ');
    console.log("PRODUCT " + product_id);

    dbConnect
    .collection('carts')
    .updateOne({$and: [{username: owner_username}, {products: {$elemMatch: {name: product_id}}}]}, {$inc: {"products.$.quantity" : parseInt(req.params.quantity)}} ,function (err, result) {
        console.log(result)
      if (err) {
        res.status(400).send('Error updating user!');
      } else {
        res.status(200).send();
      }
    });
})





module.exports = router;