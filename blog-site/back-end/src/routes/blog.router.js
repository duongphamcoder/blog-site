const express = require("express");
const router = express.Router();
const BlogController = require("../app/controller/blog.controller");

router.get("/", BlogController.getPosts);
router.get("/:id", BlogController.getPostById);

module.exports = router;
