const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');


const app = express();

const user = require('./controllers/user');
const product = require('./controllers/product');
const cart = require('./controllers/cart');
const index = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
dotenv.config();

app.use('/', user);
app.use('/', product);
app.use('/', index);
app.use('/', cart);


module.exports = app;
