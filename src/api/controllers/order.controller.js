const Order = require("./../../models/order.model");
const ObjectId = require("mongodb").ObjectID;

module.exports.getAllOrder = async (req, res, next) => {
  const order = new Order({
    orderDetails: [
      {
        product: {},
        quantity: 2,
      },
    ],
    buyer: ObjectId("60dd7034ab3a8bcd7f25b520"),
    totalPrice: 7,
    note: "abc",
  });

  const newOrder = await order.save();

  console.log("order...............", newOrder);
};

module.exports.getOrderById = (req, res, next) => {};

module.exports.createOrder = (req, res, next) => {};
