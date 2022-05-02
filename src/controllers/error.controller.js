import config from "../config/config.js"
// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  let errorDatas = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong",
  }

  if (config.environment === "production" && errorDatas.statusCode === 500) {
    errorDatas.message = "Internal Server Error"
  }

  if (config.environment === "development") {
    // If we're in development, we want to print the stack trace and other informations
    errorDatas = { ...errorDatas, stack: err.stack }
  }

  res.status(errorDatas.statusCode).json(errorDatas)
}
