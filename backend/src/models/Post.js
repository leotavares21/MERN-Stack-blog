const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const postSchema = new Schema(
  {
    image: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
