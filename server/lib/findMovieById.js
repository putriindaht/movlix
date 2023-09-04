const { Movie } = require("../models");
const findMovieById = async (id) => {
  try {
    const selectedMovie = await Movie.findByPk(id);
    if (!selectedMovie) {
      throw { name: "Movie Not Found" };
    }
    return selectedMovie;
  } catch (err) {
    next(err);
  }
};
module.exports = findMovieById;
