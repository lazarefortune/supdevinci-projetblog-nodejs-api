const authUser = (roles) => {
  return (req, res, next) => {
    const user = req.session.user

    const userRole = user.role

    if (roles.includes(userRole)) {
      next()
    } else {
      res.status(403).json({
        message: "User is not authorized to access this resource",
      })
    }
  }
}

export default authUser
