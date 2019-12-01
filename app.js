const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@lapr5-019-uzlkx.mongodb.net/test?retryWrites=true&w=majority', {
    useMongoClient: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

//Routes which should handle requests

app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
})
module.exports = app;