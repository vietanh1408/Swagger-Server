const { Schema, model } = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const timestamp = require("mongoose-timestamp");

const orderDetail = new Schema({
  product: {
    type: Object,
  },
  quantity: {
    type: Number,
  },
});

const orderSchema = new Schema(
  {
    buyer: {
      type: ObjectId,
      ref: "users",
    },
    orderId: {
      type: ObjectId,
    },
    orderDetails: {
      type: [orderDetail],
    },
    note: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
  },
  {
    versionKey: false,
  }
);
orderSchema.index({ createdAt: 1, updatedAt: 1 });

const Order = model("Order", orderSchema, "orders");
module.exports = Order;
