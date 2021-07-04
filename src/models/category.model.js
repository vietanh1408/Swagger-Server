const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
    },
  },
  {
    collection: "categories",
  }
);

const Category = mongoose.model("Category", categorySchema, "categories");

module.exports = Category;
