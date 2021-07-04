const Product = require("../../models/product.model");
const Category = require("./../../models/category.model");

module.exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    res.status(400).send("Netword Error");
  }
};

module.exports.getProductByCategory = async (req, res, next) => {
  const slug = req.params.slug.toString().trim();
  const total = await Product.find({ key: slug }).countDocuments();

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
    const products = await Product.find({ key: slug })
      .skip(skip)
      .limit(pageSize)
      .sort(sortBy);

    res.json({ products, total, totalPage });
  } catch (err) {
    res.status(400).send({ error: "Netword Error" });
  }
};
