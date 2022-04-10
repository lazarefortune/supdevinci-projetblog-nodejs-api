import AppError from "../utils/appError.js";

const ownUserAccess = (req, res, next) => {
  //   const userId = req.params.id;

  //   console.log(req.params);
  //   const {
  //     params: { id: userId },
  //   } = req;

  //   if (!userId || !Number(userId)) {
  //     throw new AppError(404, "fail", "Missing user id");
  //   }

  //   if (req.session.userId !== userId) {
  //     throw new AppError(
  //       401,
  //       "fail",
  //       "You are not authorized to access this user"
  //     );
  //   }

  next();
};

export default ownUserAccess;
