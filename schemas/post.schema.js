const postRequestSchema = {
  type: "object",
  properties: {
    postTitle: {
      type: "string",
      minLength: 5,
    },
    postBody: {
      type: "string",
      minLength: 20,
    },
    postAuthor: {
      type: "string",
      minLength: 3,
    },
  },
};

module.exports = postRequestSchema;
