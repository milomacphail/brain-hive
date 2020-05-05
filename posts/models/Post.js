e

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    owner: {
      uuid: String,
      firstName: String,
      lastName: String,
      avatar: String,
    },
    title: {
      type: String,
      required: true,
    },
    details: String,
    likes: {
      types: [String],
      default: [],
    },
    link: String,
  },
  { timestamps: {} }
);

module.exports = Post = mongoose.model("posts", postSchema);