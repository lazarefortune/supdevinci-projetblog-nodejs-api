class AppError extends Error {
  constructor(statusCode, status, message) {
    super(message);
    // TODO: delete unused properties statusCode and status
    this.statusCode = statusCode;
    this.status = status;
  }
}

export default AppError;
