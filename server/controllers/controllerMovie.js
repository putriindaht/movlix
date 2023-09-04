const { Movie, User, History } = require("../models");
const findMovieById = require("../lib/findMovieById");

class ControllerMovie {
  static async postMovies(req, res, next) {
    try {
      const { id: userId, email } = req.user;
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      const createdMovie = await Movie.create({
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId: userId,
      });
      await History.create({
        title: createdMovie.title,
        description: `entity with id ${createdMovie.id} created`,
        updatedBy: email,
      });
      res.status(201).json({
        statusCode: 201,
        data: createdMovie,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getMovies(req, res) {
    try {
      const movies = await Movie.findAll({
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });
      res.status(200).json({
        statusCode: 200,
        data: movies,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getMovieDetails(req, res, next) {
    try {
      const { id } = req.params;
      const selectedMovie = await findMovieById(id);

      res.status(200).json({
        statusCode: 200,
        data: selectedMovie,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;
      const selectedMovie = await Movie.findByPk(id);
      if (!selectedMovie) {
        throw { name: "Movie Not Found" };
      }
      const deletedMovie = await Movie.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        data: selectedMovie,
        message: `Movie ${selectedMovie.title} Successfully deleted`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async putMovies(req, res, next) {
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      const { id } = req.params;
      const { id: userId, email } = req.user;
      const selectedMovie = await findMovieById(id);
      await Movie.update(
        { title, synopsis, trailerUrl, imgUrl, rating, genreId },
        {
          where: {
            id,
          },
        },
      );
      await History.create({
        title: selectedMovie.title,
        description: `entity with id ${id} updated`,
        updatedBy: email,
      });
      res.status(200).json({
        statusCode: 200,
        message: `Movie ${selectedMovie.title} succesfully updated`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async patchMovieStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId, email } = req.user;
      const { status } = req.body;
      const selectedMovie = await findMovieById(id);
      await Movie.update(
        { status },
        {
          where: {
            id,
          },
        },
      );
      await History.create({
        title: selectedMovie.title,
        description: `entity with id ${id} status has been updated from ${selectedMovie.status} into ${status}`,
        updatedBy: email,
      });
      res.status(200).json({
        statusCode: 200,
        message: `Movie ${selectedMovie.title} status succesfully updated`,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ControllerMovie;
