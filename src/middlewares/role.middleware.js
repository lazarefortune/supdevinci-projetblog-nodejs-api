import AppError from "../utils/appError.js"

const isGranted = (roles) => {
  return (req, res, next) => {
    try {
      const {
        session: {
          user: { role },
        },
      } = req

      if (!roles.includes(role)) {
        throw new AppError(
          403,
          "fail",
          "You are not authorized to perform this action"
        )
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

export default isGranted
