const Product = require("./../../models/product.model");
const ObjectId = require("mongodb").ObjectID;

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
