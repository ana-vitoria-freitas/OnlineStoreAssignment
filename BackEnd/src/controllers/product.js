'use strict';
const dbo = require('../db/connection');
const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
 
       cb(null, path.join(__dirname, '../../img'));
 
    },

    filename: function (req, file, cb){
        cb(null, req.params.fileName);
    }
     
});

const upload = multer({ storage: storage });

//ROTA QUE EXTRAI OS PRODUTOS DE UM DETERMINADO CLIENTE
router.get('/product/:username', (req, res, next) => {

    const dbConnect = dbo.getDb();

    dbConnect
        .collection('products')
        .findOne({ username: req.params.username }, function (err, result) {
            console.log(result)
            if (result.length == 0) {
                res.status(400).send('Error fetching products!');
            } else {
                res.send(result);
            }
        });
});


router.post('/product/upload/:fileName', upload.single('foto'), (req, res) =>{
    return res.sendFile(`${path.join(__dirname, '../../img')}/${req.params.fileName}`);
      
})

//ROTA QUE CRIA UM PRODUTO
router.post('/product', (req, res, next) => {
    const dbConnect = dbo.getDb();
    const matchDocument = {
        id: req.body.id,
        name: req.body.name,
        fun_fact: req.body.fun_fact,
        ingredients: req.body.ingredients,
        nutrition: req.body.nutrition,
        recipe_link: req.body.recipe_link,
        username: req.body.username,
    };


    dbConnect
        .collection('products')
        .insertOne(matchDocument, function (err, result) {
            if (err) {
                res.status(400).send({ result: "error" });
            } else {
                res.status(200).send({ result: "success" });
            }
        });


});


//ROTA QUE EDITA UM PRODUTO
router.put('/product/:id', (req, res, next) => {
    const dbConnect = dbo.getDb();
    const matchDocument = {
        id: req.body.id,
        name: req.body.name,
        fun_fact: req.body.fun_fact,
        ingredients: req.body.ingredients,
        nutrition: req.body.nutrition,
        recipe_link: req.body.recipe_link,
        image_link: req.body.image_link,
        username: req.body.username,
        inventory: req.body.inventory
    };

    dbConnect
    .collection('products')
    .updateOne({ id: req.params.id }, {$set: matchDocument}, function (err, result) {
      if (err) {
        res.status(400).send('Error updating product!');
      } else {
        res.status(200).send();
      }
    });


});

//ROTA QUE EDITA ESTOQUE
router.put('/product/:id/:quantity', (req, res, next) => {
    const dbConnect = dbo.getDb();
    const matchDocument = {
        username: req.body.username,
    };

    let product = {};

    dbConnect
    .collection('products')
    .find({$and: [{ username: req.params.username }, {id: req.params.id}]}, function (err, result) {
        console.log(result)
        if (result.length != 0) {
            product = result;
        }
    });

    const update = {
        inventory: product.inventory - req.params.quantity
    }

    dbConnect
    .collection('products')
    .updateOne({ id: req.params.id }, {$set: update}, function (err, result) {
      if (err) {
        res.status(400).send('Error updating product!');
      } else {
        res.status(200).send();
      }
    });


});


module.exports = router;