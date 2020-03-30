const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const registerRoutes = require('./routes/register')
const loginRoutes = require('./routes/login');
require('./connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})

app.use(registerRoutes)
app.use(loginRoutes)

module.exports = app;