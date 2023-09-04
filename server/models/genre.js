"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Genre.hasMany(models.Movie, {
        foreignKey: "genreId",
        onDelete: "cascade",
      });
    }
  }
  Genre.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Genre name is required",
          },
          notEmpty: {
            msg: "Genre name is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Genre",
    },
  );
  return Genre;
};