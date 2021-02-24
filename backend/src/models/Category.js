const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      slug: "name",
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
