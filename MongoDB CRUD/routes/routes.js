const db = require('../model/dbOperation');
const express = require('express');
const routes = express.Router();
const controller = require('../controller/controller');

routes.get("/", controller.getRandomUser);
routes.get("/users", controller.getAllUser);
routes.post("/", controller.insertUser);
routes.delete("/", controller.deleteUser);
routes.put("/", controller.updateUser);

module.exports = routes;