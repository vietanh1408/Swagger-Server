const Product = require("./../../models/product.model");
const ObjectId = require("mongodb").ObjectID;

module.exports.search = async (req, res) => {
  const pageIndex = parseInt(req.query.pageIndex);
  const pageSize = parseInt(req.query.pageSize);
  const keyword = req.query.keyword;

  let skip = (pageIndex - 1) * pageSize;
  if (keyword) {
    const name = new RegExp(".*" + keyword.toLowerCase().trim() + ".*");
    const total = await Product.find({ name: name }).count();
    const matchProducts = await Product.find({ name: name })
      .skip(skip)
      .limit(pageSize);
    res.json({ matchProducts, total });
  } else {
    const total = await Product.find({}).count();
    const matchProducts = await Product.find({}).skip(skip).limit(pageSize);
    res.json({ matchProducts, total });
  }
};
