import config from "../config/config.js"
// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  const errorDatas = {
    error: {
      statusCode: err.statusCode || 500,
      message: err.message || "Something went wrong",
    },
  }

  if (
    config.environment === "production" &&
    errorDatas.error.statusCode === 500
  ) {
    errorDatas.error.message = "Internal Server Error"
  }

  if (config.environment === "development") {
    // If we're in development, we want to print the stack trace and other informations
    errorDatas.error = { ...errorDatas.error, stack: err.stack }
  }

  res.status(errorDatas.error.statusCode).json(errorDatas)
}
