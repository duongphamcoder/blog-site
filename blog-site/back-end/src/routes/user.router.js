const express = require("express");
const router = express.Router();

const usersController = require("../app/controller/user_controller");

router.post("/signin", usersController.signin);
router.post("/signup", usersController.signup);

module.exports = router;
