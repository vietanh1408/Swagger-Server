const Product = require("./../../models/product.model");

module.exports.search = async (req, res) => {
  const pageIndex = parseInt(req.query.pageIndex) || 1;
  const pageSize = parseInt(req.query.pageSize) || 12;
  const keyword = req.query.keyword || "";
  const sort = req.query.sortBy;
  const skip = (pageIndex - 1) * pageSize;

  const name = new RegExp(".*" + keyword.toLowerCase().trim() + ".*");
  const total = await Product.find({ name: name }).countDocuments();
  const totalPage = Math.ceil(total / pageSize);

  let sortBy;
  if (sort == 200) sortBy = { createdAt: 1 };
  if (sort == 300) sortBy = { name: 1 };
  if (sort == 400) sortBy = { name: -1 };
  if (sort == 500) sortBy = { price: 1 };
  if (sort == 600) sortBy = { price: -1 };

  try {
    const matchProducts = await Product.find({ name: name })
      .skip(skip)
      .limit(pageSize)
      .sort(sortBy);
    res.json({ matchProducts, total, totalPage });
  } catch (err) {
    res.status(400).send({ error: "Netword Error" });
  }
};
