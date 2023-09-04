"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Genre, { foreignKey: "genreId" });
      Movie.belongsTo(models.User, { foreignKey: "authorId" });
      Movie.belongsToMany(models.Customer, { through: "Bookmarks" });
      Movie.hasMany(models.Bookmark);
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,

        allowNull: false,
        validate: {
          notNull: {
            msg: "Title is required",
          },
          notEmpty: {
            msg: "Title is required",
          },
        },
      },
      synopsis: {
        type: DataTypes.TEXT,

        allowNull: false,
        validate: {
          notNull: {
            msg: "Synopsis is required",
          },
          notEmpty: {
            msg: "Synopsis is required",
          },
        },
      },
      trailerUrl: DataTypes.STRING,
      imgUrl: DataTypes.STRING,

      rating: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 1,
            msg: "Minimum Rating is 1",
          },
        },
      },
      genreId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Genres",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      authorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "Active",
      },
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Movie",
      paranoid: true,
    },
  );
  return Movie;
};
