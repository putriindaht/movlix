"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.Customer);
      Bookmark.belongsTo(models.Movie);
    }
  }
  Bookmark.init(
    {
      MovieId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Movies",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      CustomerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Bookmarks",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
    },
    {
      sequelize,
      modelName: "Bookmark",
    },
  );
  return Bookmark;
};
