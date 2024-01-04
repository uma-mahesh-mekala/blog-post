const mongoose = require("mongoose");

module.exports = async (fastify) => {
  mongoose
    .connect(process.env.DB_PATH)
    .then(() =>
      console.log(
        `successfully connected to mongodb://127.0.0.1:27017/BlogPost`
      )
    )
    .catch((err) => console.log(err));
};
