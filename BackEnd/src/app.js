const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');


const app = express();

const user = require('./controllers/user');
const index = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
dotenv.config();

app.use('/', user);
app.use('/', index);


module.exports = app;
