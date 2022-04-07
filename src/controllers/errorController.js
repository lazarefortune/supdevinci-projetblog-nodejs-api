// Express automatically knows that this entire function is an error handling middleware by specifying 4 parameters
import config from "../config/config.js";
export default (err, req, res, next) => {
  let errorDatas = {
    name: err.name || "error",
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  };

  if (config.environment === "production" && errorDatas.statusCode === 500) {
    errorDatas.name = "error";
    errorDatas.message = "Internal Server Error";
  }

  if (config.environment === "development") {
    // If we're in development, we want to print the stack trace and other informations
    errorDatas = { ...errorDatas, stack: err.stack };
  }
  res.status(errorDatas.statusCode).json(errorDatas);
};
