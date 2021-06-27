const Product = require("./../../models/product.model");

module.exports.search = async (req, res) => {
  const pageIndex = parseInt(req.query.pageIndex) || 1;
  const pageSize = parseInt(req.query.pageSize) || 12;
  const keyword = req.query.keyword || "";
  const skip = (pageIndex - 1) * pageSize;

  const name = new RegExp(".*" + keyword.toLowerCase().trim() + ".*");
  const total = await Product.find({ name: name }).count();
  const totalPage = Math.ceil(total / pageSize);

  console.log("pageSize....", pageSize, "PageIndex.....", pageIndex);

  const matchProducts = await Product.find({ name: name })
    .skip(skip)
    .limit(pageSize);

  res.json({ matchProducts, total, totalPage });
};
