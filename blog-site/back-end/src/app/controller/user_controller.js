const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User } = require("../../models");
const { checkValid, catchError } = require("../../services/user.services");

const userAttributes = [
  "id",
  "firstName",
  "lastName",
  "username",
  "email",
  "password",
  "phoneNumber",
  "address",
  "role",
  "status",
];

const signinAttributes = ["id", "username", "password", "role", "status"];

class UserController {
  // [POST] /signin
  async signin(req, res) {
    try {
      const { username, password } = req.body;
      const isValid = !username || !password ? false : true;
      checkValid(isValid, "message", "Username and password is require");
      const user = await User.findOne({
        where: { username: username },
        attributes: signinAttributes,
      });
      if (user && user.dataValues["status"] != 0) {
        const match = await bcrypt.compare(
          password,
          user.dataValues["password"]
        );
        checkValid(match, "password", "Password is not match");
        const { id, role, status } = user.dataValues;
        const token = jwt.sign({ id, role, status }, process.env.SECRET_KEY);
        return res.status(200).json({ statusCode: 200, token });
      }
      const errorData =
        user == null
          ? { path: "username", message: "Username is not exists" }
          : { path: "message", message: "User is banned" };

      checkValid(false, errorData.path, errorData.message);
    } catch (error) {
      return res
        .status(203)
        .json({ statusCode: 203, errors: catchError(error) });
    }
  }

  // [POST] /signup
  async signup(req, res) {
    try {
      const data = req.body;
      checkValid(
        data["password"] < 6,
        "password",
        "Password must have at least 6 characters"
      );
      data["password"] = await bcrypt.hash(data["password"], saltRounds);
      const user = await User.create(data);
      return res.status(200).json({ statusCode: 200, user });
    } catch (error) {
      return res
        .status(203)
        .json({ statusCode: 203, errors: catchError(error) });
    }
  }
}

module.exports = new UserController();
