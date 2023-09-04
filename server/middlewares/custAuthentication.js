const { verifyToken } = require("../helpers/tokenJWT");
const { Customer } = require("../models");

const custAuthentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Not authenticated" };
    }

    const payload = verifyToken(access_token);
    if (!payload) {
      throw { name: "Not authenticated" };
    }

    const result = await Customer.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!result) {
      throw { name: "Not authenticated" };
    }

    req.customer = {
      id: result.id,
      email: result.email,
      role: result.role,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = custAuthentication;
