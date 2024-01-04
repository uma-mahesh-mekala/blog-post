const fastify = require("fastify");
const fastifyView = require("@fastify/view");
const AutoLoad = require("@fastify/autoload");
const fastifyStatic = require("@fastify/static");
const formbody = require("@fastify/formbody");
const dotenv = require("dotenv");
const db = require("./db/db");

dotenv.config();

const ejs = require("ejs");
const path = require("path");

const buildServer = async () => {
  const Fastify = fastify();
  Fastify.register(formbody)
    .register(fastifyStatic, {
      root: path.join(__dirname, "public"),
    })
    .register(fastifyView, {
      engine: {
        ejs: require("ejs"),
      },
    })
    .register(AutoLoad, {
      dir: path.join(__dirname, "routes"),
      prefix: "/",
    })
    .register(db);

  return Fastify;
};

buildServer().then((instance) => {
  const serverOptions = {
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
  };
  instance.listen(serverOptions, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    console.log(`Server running on ${address}`);
  });
});
