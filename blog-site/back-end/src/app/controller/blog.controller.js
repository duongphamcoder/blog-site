const {
  Post,
  User,
  Category,
  Comment,
  Reaction,
  sequelize,
} = require("../../models");
const { LIMIT_POST } = require("../../constans/post.const");
const {
  blogAttributes,
  userAttributes,
  categoryAttributes,
  commentAttributes,
  reactionAttributes,
} = require("../attributes/post.attributes");

class BlogController {
  constructor() {}
  async getPosts(req, res) {
    try {
      const { page } = req.query || 1;
      const offset = (parseInt(page) - 1) * LIMIT_POST;
      const result = await Post.findAndCountAll({
        attributes: blogAttributes,
        limit: LIMIT_POST,
        offset: offset,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            as: "user",
            attributes: userAttributes,
          },
          {
            model: Category,
            as: "category",
            attributes: categoryAttributes,
          },
          {
            model: Comment,
            as: "comments",
            attributes: commentAttributes,
          },
          {
            model: Reaction,
            as: "reactions",
            attributes: reactionAttributes,
          },
        ],
      });
      const posts = result.rows.map((post) => {
        post.dataValues["comments"] = post.dataValues["comments"].length;
        post.dataValues["reactions"] = post.dataValues["reactions"].length;
        return post.dataValues;
      });
      const amountPage =
        result.count / LIMIT_POST <= 1
          ? 1
          : Math.round(result.count / LIMIT_POST + 0.5);
      const currentPage = parseInt(page);
      return res.status(200).json({ posts, amountPage, currentPage });
    } catch (error) {
      console.log(error);
    }
  }

  async getPostById(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findOne({
        where: { id: id },
        attributes: blogAttributes,
        include: [
          {
            model: User,
            as: "user",
            attributes: userAttributes,
          },
          {
            model: Category,
            as: "category",
            attributes: categoryAttributes,
          },
          {
            model: Comment,
            as: "comments",
            attributes: ["id", "content"],
            include: [{ model: User, attributes: userAttributes }],
          },
          {
            model: Reaction,
            as: "reactions",
            attributes: reactionAttributes,
            include: [{ model: User, attributes: userAttributes }],
          },
        ],
      });
      return res.status(200).json({ post });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new BlogController();
