"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { as: "user" });
      this.belongsTo(models.Category, { as: "category" });
      this.hasMany(models.Report, { as: "reports" });
      this.hasMany(models.Reaction, { as: "reactions", foreignKey: "postId" });
      this.hasMany(models.Comment, { as: "comments", foreignKey: "postId" });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
