const Product = require("./../../models/product.model");
const ObjectId = require("mongodb").ObjectID;

module.exports.index = async (req, res, next) => {
  const total = await Product.find({}).count();

  const pageIndex = parseInt(req.query.pageIndex) || 1;
  const pageSize = parseInt(req.query.pageSize) || 12;
  const sort = req.query.sortBy || 200;
  const skip = (pageIndex - 1) * pageSize;

  let sortBy;
  if (sort == 200) sortBy = { createdAt: 1 };
  if (sort == 300) sortBy = { name: 1 };
  if (sort == 400) sortBy = { name: -1 };
  if (sort == 500) sortBy = { price: 1 };
  if (sort == 600) sortBy = { price: -1 };

  const totalPage = Math.ceil(total / pageSize);
  try {
    const products = await Product.find({})
      .skip(skip)
      .limit(pageSize)
      .sort(sortBy);

    res.json({ products, total, totalPage });
  } catch (err) {
    res.status(400).send({ error: "Netword Error" });
  }
};

module.exports.detail = async (req, res) => {
  const id = new ObjectId(req.params.id);
  try {
    const product = await Product.findOne({ _id: id });
    res.json(product);
  } catch (err) {
    res.status(400).send({ error: "Network Error" });
  }
};

module.exports.productSlide = async (req, res) => {
  try {
    const products = await Product.find({ rating: 5 });
    res.json(products);
  } catch (err) {
    res.status(400).send({ error: "Netword Error" });
  }
};
