const Product = require("./../../models/product.model");
const ObjectId = require("mongodb").ObjectID;

module.exports.index = async (req, res, next) => {
  const products = await Product.find();
  const total = await Product.count();

  const pageIndex = parseInt(req.query.pageIndex);
  const pageSize = parseInt(req.query.pageSize);

  if (pageIndex) {
    let skip = (pageIndex - 1) * pageSize;

    const products = await Product.find({}).skip(skip).limit(pageSize);

    res.json({ products, total });
  } else res.json({ products, total });
};

module.exports.detail = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const product = await Product.findOne({ _id: id });
  res.json(product);
};
