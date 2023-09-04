const { Customer, Movie, Genre } = require("../models");
const { generateToken } = require("../helpers/tokenJWT");
const { validatePassword } = require("../helpers/bcrypt");
const { getPagination } = require("../helpers/getPagination");
const { Op } = require("sequelize");
const { OAuth2Client } = require("google-auth-library");
const { default: axios } = require("axios");
class ControllerPub {
  static async pubRegister(req, res, next) {
    try {
      const { email, password } = req.body;
      const newCustomer = await Customer.create({
        email,
        password,
        role: "Customer",
      });
      res.status(201).json({
        statusCode: 201,
        message: "Success register",
        customer: {
          id: newCustomer.id,
          email: newCustomer.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async pubLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const customer = await Customer.findOne({
        where: {
          email,
        },
      });
      if (!customer) {
        throw { name: "Invalid email or password" };
      }
      const isValidPassword = validatePassword(password, customer.password);
      if (!isValidPassword) {
        throw { name: "Invalid email or password" };
      }

      const token = generateToken({
        id: customer.id,
        email: customer.email,
        role: customer.role,
      });
      res.status(200).json({
        statusCode: 200,
        access_token: token,
        user: {
          id: customer.id,
          email: customer.email,
          role: customer.role,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async pubGlogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client();
      const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const [customer, created] = await Customer.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          id: payload.id,
          email: payload.email,
          password: "google-login",
          role: "Customer",
        },
        hooks: false,
      });
      const token = generateToken({
        id: customer.id,
        email: customer.email,
      });
      const newCustomer = {
        id: customer.id,
        email: customer.email,
        role: customer.role,
      };
      res.status(200).json({
        statusCode: 200,
        message: token,
        customer: newCustomer,
      });
    } catch (err) {
      next(err);
    }
  }

  static async pubListMovie(req, res, next) {
    try {
      const { page, title } = req.query;
      const dataPerPage = 5;
      const { limit, offset } = page
        ? getPagination(page - 1, dataPerPage)
        : {};
      let condition = {};
      title ? (condition["title"] = { [Op.iLike]: `%${title}%` }) : null;
      const listMovies = await Movie.findAndCountAll({
        limit,
        offset,
        where: condition,
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        order: [["id", "ASC"]],
      });
      res.status(200).json({
        data: listMovies.rows,
        totalData: listMovies.count,
        totalPage: Math.ceil(listMovies.count / dataPerPage),
      });
    } catch (err) {
      next(err);
    }
  }

  static async pubMovieDetail(req, res, next) {
    try {
      const BASE_URL = process.env.BASE_URL;
      const QR_CODE_ACCESS_TOKEN = process.env.QR_CODE_ACCESS_TOKEN;
      const { id } = req.params;
      const movie = await Movie.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: {
          model: Genre,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });

      if (!movie) {
        throw { name: "Movie Not Found" };
      }

      const response = await axios({
        url: `https://api.qr-code-generator.com/v1/create?access-token=${QR_CODE_ACCESS_TOKEN}`,
        method: "post",
        data: {
          frame_name: "no-frame",
          qr_code_text: BASE_URL + "/detail/" + id,
          image_format: "SVG",
          qr_code_logo: "scan-me-square",
        },
      });

      const qrCode = response.data;

      res.status(200).json({
        data: movie,
        qrCode,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ControllerPub;
