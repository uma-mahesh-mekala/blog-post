const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postId: "Number",
  postTitle: "String",
  postBody: "String",
  postAuthor: "String",
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
