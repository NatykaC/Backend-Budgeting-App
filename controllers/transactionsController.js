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
        try{
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

    transactions.post("/", (req, res, next)=>{
        try{
            const transToCreate = req.body;

            if(transToCreate){
                transactionsArray.push(transToCreate);
                res.status(201).send(transToCreate);
            }
            else{
                res.status(404).send({message: "Unable to create new transaction!"});
            }
        }
        catch(error){
            next(error);
        }
    });

    transactions.put("/:id", (req, res, next)=>{
        try{
            const transAtId = parseInt(req.params.id);
            const transToUpdate = req.body;
            const transAtIndex = transactionsArray.findIndex(index => index.id === transAtId);

            if(transAtIndex === -1){
                res.status(404).send({messaage: "Unable to find transaction at the provided index!"})
            }
            const currentTrans = transactionsArray[transAtIndex];
            for(let item in transToUpdate){
                if(currentTrans.hasOwnProperty([item])){
                    currentTrans[item] = transToUpdate[item];
                }
            }
            transactionsArray[transAtIndex] = currentTrans;
            res.status(200).send(currentTrans);
        }
        catch(error){
            next(error);
        }
    });

    transactions.delete("/:id", (req, res, next)=>{
        try {
            const id = parseInt(req.params.id);
            const transIndex = transactionsArray.findIndex(transToDel => transToDel.id === id);

            if(transIndex === -1){
                res.status(404).send({message: "Unable to find transaction to be deleted!"});
            }
            const deletedTrans = transactionsArray.splice(transIndex, 1);
            res.status(200).send(deletedTrans[0]);
        }
        catch(error){
            next(error);
        }
    });




    module.exports = transactions;