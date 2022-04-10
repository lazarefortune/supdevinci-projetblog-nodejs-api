import jsonwebtoken from "jsonwebtoken";
import config from "../config/config.js";
import AppError from "../utils/appError.js";

const auth = (req, res, next) => {
  const {
    headers: { authentication: jwt },
  } = req;

  try {
    const { payload } = jsonwebtoken.verify(
      jwt,
      config.security.session.secret
    );

    req.session = payload;
    next();
  } catch (err) {
    if (err instanceof jsonwebtoken.TokenExpiredError) {
      throw new AppError(401, "fail", "Token expired");
    }

    if (err instanceof jsonwebtoken.JsonWebTokenError) {
      throw new AppError(401, "fail", "Invalid token");
    }

    throw new AppError(500, "fail", "Internal server error");
  }
};

export default auth;
