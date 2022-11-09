"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "John",
          lastName: "Doe",
          username: "user1",
          password: bcrypt.hashSync("123456", 10),
          email: "user1@gmail.com",
          phoneNumber: "0123321211",
          address: "DHSP Da Nang",
          role: 1,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Duong",
          lastName: "Quy",
          username: "user2",
          password: bcrypt.hashSync("123456", 10),
          email: "user2@gmail.com",
          phoneNumber: "0123321211",
          address: "DHSP Da Nang",
          role: 1,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Ngoc",
          lastName: "Van",
          username: "user3",
          password: bcrypt.hashSync("123456", 10),
          email: "user3@gmail.com",
          phoneNumber: "0123321211",
          address: "DHSP Da Nang",
          role: 1,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
