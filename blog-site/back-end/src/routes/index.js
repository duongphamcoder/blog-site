const userRouter = require("./user.router");

const route = (app) => {
  app.use("/users", userRouter);
};

module.exports = route;
