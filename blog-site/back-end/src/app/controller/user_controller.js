const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User } = require("../../models");
const { catchError } = require("../../services/user.services");
const UserHepler = require("../../helpers/users.helper");
const errorMessages = require("../../constans/users.const");

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
      const isNotEmpty = username && password ? true : false;
      UserHepler.signinValidation(isNotEmpty, errorMessages["REQUIRE_MESSAGE"]);
      const user = await User.findOne({
        where: { username: username },
        attributes: signinAttributes,
      });
      if (user && user.dataValues["status"] != 0) {
        const match = await bcrypt.compare(
          password,
          user.dataValues["password"]
        );
        UserHepler.signinValidation(match, errorMessages["NOT_MATCHING"]);
        const { id, role, status } = user.dataValues;
        const token = jwt.sign({ id, role, status }, process.env.SECRET_KEY);
        return res.status(200).json({ statusCode: 200, token });
      }
      UserHepler.signinValidation(false, errorMessages["NOT_MATCHING"]);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ statusCode: 400, errors: catchError(error) });
    }
  }

  // [POST] /signup
  async signup(req, res) {
    try {
      const data = req.body;
      await UserHepler.validateSignup(data);
      data["password"] = await bcrypt.hash(data["password"], saltRounds);
      const user = await User.create(data);
      return res.status(200).json({ statusCode: 200, user });
    } catch (error) {
      return res
        .status(400)
        .json({ statusCode: 400, errors: catchError(error) });
    }
  }

  test(req, res) {
    console.log("aaaaaaaa");
    res.status(400).json({});
  }
}

module.exports = new UserController();
