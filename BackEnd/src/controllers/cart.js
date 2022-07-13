'use strict';
const dbo = require('../db/connection');
const express = require('express');
const router = express.Router();


//ROTA QUE RETORNA CARRINHO DE UM USUÁRIO
router.get('/cart', (req, res, next) => {

    const dbConnect = dbo.getDb();

    dbConnect
        .collection('carts')
        .findOne({ username: req.params.username }, function (err, result) {
            res.status(200).send(result);
        });
});

//ROTA QUE CRIA CARRINHO DE USUÁRIO
router.post('/cart', (req, res, next) => {

    const dbConnect = dbo.getDb();
    const matchDocument = {
        username: req.body.name,
        quantity: 0,
        products: []
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

    dbConnect
        .collection('carts')
        .updateOne({username: owner_username}, {$push: {products: product_id}}, function (err, result) {
            if (err) {
                res.status(400).send({ result: "error" });
            } else {
                res.status(200).send({ result: "success" });
            }
        });
});






module.exports = router;