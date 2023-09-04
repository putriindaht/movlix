"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Movies", "status", {
      type: DataTypes.STRING,
      defaultValue: "Active",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Movies", "status");
  },
};
