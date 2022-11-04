"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post);
      this.hasMany(models.Report);
      this.hasMany(models.Reaction);
      this.hasMany(models.Comment);
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 15],
            msg: "First name not more than 15 characters",
          },
          notEmpty: {
            msg: "Require",
          },
          is: {
            args: /^[a-zA-Z ]*$/,
            msg: "Name can only contain letters",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 15],
            msg: "Last name not more than 15 characters",
          },
          notEmpty: {
            msg: "Require",
          },
          is: {
            args: /^[a-zA-Z ]*$/,
            msg: "Name can only contain letters",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 30],
            msg: "Length must be between 3 and 30",
          },
          notEmpty: {
            msg: "Require",
          },
          isUnique(value) {
            return User.findOne({
              where: { username: value },
              attributes: ["username"],
            }).then((user) => {
              if (user) {
                throw new Error("Username are already in use");
              }
            });
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Email not valid",
          },
          notEmpty: {
            msg: "Require",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [10, 11],
            msg: "Length must be between 10 and 11",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [5, 50],
            msg: "Length must be between 5 and 50",
          },
        },
      },
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
