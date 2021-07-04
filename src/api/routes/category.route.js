const express = require("express");
const route = express.Router();
const controller = require("../controllers/category.controller");

route.get("/", controller.getAll);
route.get("/:slug", controller.getProductByCategory);

module.exports = route;
