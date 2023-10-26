const express = require("express");
const transactions = express.Router();
const transactionsArray = require("../models/transactions.js");

transactions.get("/", (req, res)=>{
    res.json(transactionsArray)
})


