const Product = require("./../../models/product.model");
const ObjectId = require("mongodb").ObjectID;

module.exports.index = async (req, res, next) => {
  const total = await Product.find({}).count();

  const pageIndex = parseInt(req.query.pageIndex) || 1;
  const pageSize = parseInt(req.query.pageSize) || 12;
  const skip = (pageIndex - 1) * pageSize;

  const totalPage = Math.ceil(total / pageSize);

  const products = await Product.find({}).skip(skip).limit(pageSize);

  res.json({ products, total, totalPage });
};

module.exports.detail = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const product = await Product.findOne({ _id: id });
  res.json(product);
};
