const { Movie } = require("../models");
const authorization = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;

    if (role === "Admin") {
      next();
    } else {
      const { id: movieId } = req.params;
      const movie = await Movie.findByPk(movieId);
      if (movie.authorId !== userId) {
        throw { name: "Not authorized" };
      }
      next();
    }
  } catch (err) {
    next(err);
  }
};
module.exports = authorization;
