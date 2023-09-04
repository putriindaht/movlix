const { OAuth2Client } = require("google-auth-library");
const { generateToken, verifyToken } = require("../helpers/tokenJWT");
const { User, History } = require("../models");
const bcrypt = require("bcryptjs");

class ControllerUser {
  static async register(req, res, next) {
    try {
      const { email, password, username, phoneNumber, address } = req.body;
      const newUser = await User.create({
        email,
        password,
        role: "Admin",
        username,
        phoneNumber,
        address,
      });
      res.status(201).json({
        statusCode: 201,
        data: {
          id: newUser.id,
          email: newUser.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await User.findOne({
        where: {
          email,
        },
      });

      if (!data) {
        throw { name: "Invalid email or password" };
      }

      const passwordValidation = bcrypt.compareSync(password, data.password);

      if (!passwordValidation) {
        throw { name: "Invalid email or password" };
      }
      console.log(data);
      const token = generateToken({
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role,
      });

      res.status(200).json({
        statusCode: 200,
        access_token: token,
        user: {
          id: data.id,
          email: data.email,
          username: data.username,
          role: data.role,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async glogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client();
      const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          id: payload.id,
          email: payload.email,
          password: "google-login",
          role: "Staff",
        },
        hooks: false,
      });

      const token = generateToken({
        id: user.id,
        email: user.email,
      });

      const newUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      };
      res.status(200).json({
        statusCode: 200,
        message: token,
        user: newUser,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ControllerUser;
