const fastify = require("fastify");
const posts = require("../posts/posts");
const Post = require("../models/post");
const postRequestSchema = require("../schemas/post.schema");

module.exports = async (fastify) => {
  fastify.route({
    method: "get",
    url: "/home",
    handler: async (request, reply) => {
      const posts = await Post.find();
      return reply.view("/templates/index.ejs", {
        myHeading: `Welcome to My Page`,
        posts,
      });
    },
  });

  fastify.route({
    method: "get",
    url: "/newpost",
    handler: async (request, reply) => {
      console.log("got a request");
      return reply.view("/templates/newpost.ejs", {
        myHeading: `Welcome to My Page`,
        posts,
      });
    },
  });

  fastify.route({
    method: "post",
    url: "/createpost",
    schema: {
      body: postRequestSchema,
    },
    handler: async (request, reply) => {
      const posts = await Post.find();
      const { postTitle, postBody, postAuthor } = request.body;
      const post = new Post({
        postId: posts.length + 1,
        postTitle,
        postBody,
        postAuthor,
      });
      const result = await post.save();
      console.log(result);
      reply.redirect("/home");
    },
  });

  fastify.route({
    method: "get",
    url: "/post/:id",
    handler: async (request, reply) => {
      const post = await Post.findOne({ postId: parseInt(request.params.id) });
      if (!post) {
        reply.status(404).send("Oops Post not found.");
      }
      const { postTitle, postBody, postAuthor } = post;
      return reply.view("/templates/post.ejs", {
        postTitle,
        postBody,
        postAuthor,
      });
    },
  });
};
