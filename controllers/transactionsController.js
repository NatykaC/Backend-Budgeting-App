const express = require("express");
const transactions = express.Router();
const transactionsArray = require("../models/transactions.js");

transactions.use(express.json());

transactions.get("/", (req, res, next)=>{
    try{
        if(transactionsArray && transactionsArray.length > 0){
            res.status(200).send(transactionsArray);
        }
        else {
            res.status(404).send({message: "Not transactions found!"});
        }
    }
    catch(error){
        next(error);
    }
    
});

transactions.get("/:id", (req, res, next)=>{
    try {
        const id = req.params.id;
        const transById = transactionsArray.find(trans => trans.id === parseInt(id));
        
        if(transById){
            res.status(200).send(transById);
        }
        else {
            res.status(404).send({message: "Unable to find a transcation with the given id!"})
        }
    }
    catch(error){
        next(error);
    }
});


module.exports = transactions;