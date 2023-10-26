const express = require("express");

const app = express();

const transactionsController = require("./controllers/transactionsController.js");

app.use(express.json());

app.use("/transactions", transactionsController);

app.get("/", (req, res)=>{
    res.send("Welcome to The Budgeter App")
});

app.get("*", (req, res)=>{
    res.status(404).json({error: "Page Not Found!!!"})
});

module.exports = app;
