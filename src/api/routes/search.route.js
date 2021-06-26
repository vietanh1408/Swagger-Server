const express = require("express");
const route = express.Router();
const controller = require("../controllers/search.controller");

route.get("/", controller.search);

module.exports = route;
