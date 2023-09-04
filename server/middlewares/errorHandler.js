const errorHandler = (err, req, res, next) => {
  console.log(err);
  let status = 0;
  let message = "";
  switch (err.name) {
    case "SequelizeValidationError":
      status = 400;
      message = err.errors.map((el) => {
        return el.message;
      });
      break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = ["Email already registered"];
      break;
    case "Movie Not Found":
      status = 404;
      message = "Movie Not Found";
      break;
    case "Invalid email or password":
      status = 401;
      message = "Invalid email or password";
      break;
    case "Not authenticated":
      status = 401;
      message = "Please login first";
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token";
      break;
    case "Not authorized":
      status = 403;
      message = "Not authorized";
      break;
    default:
      (status = 500), (message = "Internal Server Error");
      break;
  }
  res.status(status).json({
    statusCode: status,
    message: message,
  });
};

module.exports = errorHandler;
