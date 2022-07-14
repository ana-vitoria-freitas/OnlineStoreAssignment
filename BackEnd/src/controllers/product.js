'use strict';
const dbo = require('../db/connection');
const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
 
       cb(null, path.join(__dirname, '../../../Mockup/homePage/assets'));
 
    },

    filename: function (req, file, cb){
        cb(null, req.params.fileName);
    }
     
});

const upload = multer({ storage: storage });

//ROTA PARA SALVAR IMAGEM DE PRODUTO
router.post('/product/upload/:fileName', upload.single('foto'), (req, res) =>{
    return res.sendFile(`${path.join(__dirname, '../../img')}/${req.params.fileName}`);
      
})

//ROTA QUE RETORNA TODOS OS PRODUTOS HOT
router.get('/product/hot', (req, res, next) => {

    const dbConnect = dbo.getDb();

    dbConnect
        .collection('products')
        .find({ types: "hot" })
        .toArray(function (err, result) {
            console.log(result)
            if (result.length == 0) {
                res.status(400).send('Error fetching products!');
            } else {
                res.send(result);
            }
        });
});

//ROTA QUE RETORNA TODOS OS PRODUTOS COLD
router.get('/product/cold', (req, res, next) => {

    const dbConnect = dbo.getDb();

    dbConnect
        .collection('products')
        .find({ types: "cold" })
        .toArray(function (err, result) {
            console.log(result)
            if (result.length == 0) {
                res.status(400).send('Error fetching products!');
            } else {
                res.send(result);
            }
        });
});

//ROTA QUE RETORNA TODOS OS PRODUTOS ALCOHOLIC
router.get('/product/alcoholic', (req, res, next) => {

    const dbConnect = dbo.getDb();

    dbConnect
        .collection('products')
        .find({ types: "alcoholic" })
        .toArray(function (err, result) {
            console.log(result)
            if (result.length == 0) {
                res.status(400).send('Error fetching products!');
            } else {
                res.send(result);
            }
        });
});


//ROTA QUE RETORNA TODOS OS PRODUTOS
router.get('/product', (req, res, next) => {

    const dbConnect = dbo.getDb();

    dbConnect
        .collection('products')
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


//ROTA QUE EXTRAI OS PRODUTOS DE UM DETERMINADO CLIENTE
router.get('/product/:username', (req, res, next) => {

    const dbConnect = dbo.getDb();

    dbConnect
        .collection('products')
        .find({ username: req.params.username })
        .toArray(function (err, result) {
            console.log(result)
            if (result.length == 0) {
                res.status(400).send('Error fetching products!');
            } else {
                res.send(result);
            }
        });
});

//ROTA QUE EXTRAI UM PRODUTO PELO NOME E USERNAME
router.get('/product/:name/:username', (req, res, next) => {

    const dbConnect = dbo.getDb();

    dbConnect
        .collection('products')
        .find({$and: [{ name: req.params.name }, {username: req.params.username}]})
        .toArray(function (err, result) {
            console.log(result)
            if (result.length == 0) {
                res.status(400).send('Error fetching products!');
            } else {
                res.send(result);
            }
        });
});



//ROTA QUE CRIA UM PRODUTO
router.post('/product', (req, res, next) => {
    const dbConnect = dbo.getDb();
    const matchDocument = {
        name: req.body.name,
        fun_fact: req.body.fun_fact,
        ingredients: req.body.ingredients,
        nutrition: req.body.nutrition,
        recipe_link: req.body.recipe_link,
        username: req.body.username,
        isAvailable: req.body.isAvailable,
        price: req.body.price
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
router.put('/product/:name', (req, res, next) => {
    const dbConnect = dbo.getDb();
    const matchDocument = {
        name: req.body.name,
        fun_fact: req.body.fun_fact,
        ingredients: req.body.ingredients,
        nutrition: req.body.nutrition,
        recipe_link: req.body.recipe_link,
        username: req.body.username,
        isAvailable: req.body.isAvailable,
        price: req.body.price
    };

    dbConnect
    .collection('products')
    .updateOne({$and: [{ name: req.params.name }, {username: req.body.username}]}, {$set: matchDocument}, function (err, result) {
      if (err) {
        res.status(400).send('Error updating product!');
      } else {
        res.status(200).send();
      }
    });


});



module.exports = router;