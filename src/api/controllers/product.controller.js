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

module.exports.search = async (req, res) => {
  const pageIndex = parseInt(req.query.pageIndex);
  const pageSize = parseInt(req.query.pageSize);
  const keyword = req.query.keyword.toLowerCase().trim();
  const name = new RegExp(keyword, "g");
  const matchProducts = await Product.find({ name: name });
  const total = await Product.find({ name: name }).count();
  if (pageIndex) {
    let skip = (pageIndex - 1) * pageSize;

    const matchProducts = await Product.find({ name: name })
      .skip(skip)
      .limit(pageSize);
    res.json({ matchProducts, total });
  } else res.json({ matchProducts, total });
};

module.exports.detail = async (req, res) => {
  const id = new ObjectId(req.params.id);
  const product = await Product.findOne({ _id: id });
  res.json(product);
};
