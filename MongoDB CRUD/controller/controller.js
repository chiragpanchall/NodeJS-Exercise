const db = require('../model/dbOperation');
const express = require('express');
const routes = express.Router();

db.connect();

let tempData = [
    { fname: "chirag", lname: "panchal" }, { fname: "divy", lname: "kothari" },
    { fname: "yogesh", lname: "panchal" }, { fname: "chirag", lname: "prajapati" },
    { fname: "bhavdeep", lname: "parmar" }, { fname: "yathart", lname: "oza" },
    { fname: "prince", lname: "parmar" }, { fname: "ramesh", lname: "patel" },
];

async function getRandomUser(req, res) {
    res.end(JSON.stringify(tempData[Math.floor(Math.random() * tempData.length)]));
}

async function getAllUser(req, res) {
    let data = await db.getUser();
    res.end(JSON.stringify(data));
}


async function insertUser(req, res) {
    await db.insertUser(req.body);
    let data = await db.getUser();
    res.end(JSON.stringify(data));
}

async function updateUser(req, res) {
    let filter = { _id: req.body['_id'] };
    let newdata = { fName: req.body['fName'], lName: req.body['lName'] };
    console.log(filter);
    await db.updateUser(filter, newdata);
    let data = await db.getUser();
    res.end(JSON.stringify(data));
}




async function deleteUser(req, res) {
    await db.deleteUser(req.body);
    let data = await db.getUser();
    res.send(JSON.stringify(data));
}

module.exports = { getAllUser, getAllUser, getRandomUser, insertUser, deleteUser, updateUser };