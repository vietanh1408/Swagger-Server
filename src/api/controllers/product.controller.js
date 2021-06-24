const Product = require("./../../models/product.model");
const ObjectId = require("mongodb").ObjectID;

module.exports.index = async (req, res, next) => {
  const products = await Product.find();
  const total = await Product.count();
  res.json({ products, total });
};

module.exports.search = async (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim();
  const name = new RegExp(keyword, "g");
  const matchProducts = await Product.find({ name: name });
  res.json(matchProducts);
};

module.exports.detail = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const product = await Product.findOne({ _id: id });
  res.json(product);
};
