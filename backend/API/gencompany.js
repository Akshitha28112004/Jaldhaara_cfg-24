const express = require('express');
const gencomapanyApp = express.Router();
const expressAsyncHandler = require('express-async-handler');
require('dotenv').config();

let companies;

gencomapanyApp.use((req, res, next) => {
    companies = req.app.get('companies');
    next();
});

// Example route
gencomapanyApp.get('/companies', expressAsyncHandler(async (req, res) => {
    const users = await companies.find({}).toArray();
    res.send(users);
}));

gencomapanyApp.post('/companies', expressAsyncHandler(async (req, res) => {
    const company = req.body;
    await companies.insertOne(company);
    res.send({message:"data inserted"});
}));

module.exports = gencomapanyApp;
