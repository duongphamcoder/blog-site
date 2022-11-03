"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "subcomments",
      [
        {
          content: "This post is helpful!",
          level: 1,
          userId: 1,
          commentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "haha",
          level: 2,
          userId: 1,
          parentSubCommentId: 2,
          commentId: 1,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "nice",
          level: 2,
          userId: 1,
          parentSubCommentId: 2,
          commentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "comment",
          level: 3,
          userId: 3,
          parentSubCommentId: 3,
          commentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: "@@@@",
          level: 3,
          userId: 2,
          parentSubCommentId: 3,
          commentId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("subcomments", null, {});
  },
};
