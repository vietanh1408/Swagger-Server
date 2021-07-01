const express = require("express");
const route = express.Router();
const controller = require("../controllers/order.controller");

route.get("/", controller.getAllOrder);

route.get("/:id", controller.getOrderById);

route.post("/create", controller.createOrder);

module.exports = route;
