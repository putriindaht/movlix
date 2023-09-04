const { Bookmark, Movie } = require("../models");
class ControllerPubWishlist {
  static async getPubBookmark(req, res, next) {
    try {
      const { id } = req.customer;
      const bookmarks = await Movie.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: {
          model: Bookmark,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          where: {
            CustomerId: id,
          },
        },
      });
      res.status(200).json({
        data: bookmarks,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addPubBookmark(req, res, next) {
    try {
      const { movieId } = req.params;
      const { id: CustomerId } = req.customer;
      const findMovie = await Movie.findByPk(+movieId);

      if (!findMovie) {
        throw { name: "Movie Not Found" };
      }
      const newBookmark = await Bookmark.create({
        MovieId: movieId,
        CustomerId,
      });
      res.status(201).json({
        id: newBookmark.id,
        MovieId: newBookmark.MovieId,
        CustomerId: newBookmark.CustomerId,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ControllerPubWishlist;
