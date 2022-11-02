"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Comment);
      this.hasMany(this);
      this.belongsTo(this);
    }
  }
  SubComment.init(
    {
      content: DataTypes.STRING,
      level: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
      parentSubCommentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SubComment",
    }
  );
  return SubComment;
};
