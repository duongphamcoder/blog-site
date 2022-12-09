const userRouter = require("./user.router");
const blogRouter = require("./blog.router");

const route = (app) => {
  app.use("/users", userRouter);
  app.use("/posts", blogRouter);
};

module.exports = route;
