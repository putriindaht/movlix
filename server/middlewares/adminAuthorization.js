const { Movie } = require("../models");
const adminAuthorization = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;

    if (role === "Admin") {
      next();
    } else {
      throw { name: "Not authorized" };
    }
  } catch (err) {
    next(err);
  }
};
module.exports = adminAuthorization;
