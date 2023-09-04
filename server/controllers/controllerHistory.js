const { History } = require("../models");
class ControllerHistory {
  static async getHistory(req, res, next) {
    try {
      const histories = await History.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({
        statusCode: 200,
        data: histories,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ControllerHistory;
