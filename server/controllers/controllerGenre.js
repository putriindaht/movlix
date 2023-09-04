const { Genre } = require("../models/");

class ControllerGenre {
  static async getGenres(req, res, next) {
    try {
      const genres = await Genre.findAll();
      res.status(200).json({
        statusCode: 200,
        data: genres,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerGenre;
