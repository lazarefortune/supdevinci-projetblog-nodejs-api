import jsonwebtoken from "jsonwebtoken";
import config from "../config/config.js";

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
        res.status(401).send("Token expired");

        return;
      }

      if (err instanceof jsonwebtoken.JsonWebTokenError) {
        res.status(401).send("Invalid token");

        return;
      }

      res.status(500).send("Internal server error");
    }
};

export default auth;
