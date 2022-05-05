import express, { json } from "express"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import xss from "xss-clean"
import hpp from "hpp"
import cors from "cors"
import swaggerDocument from "../swagger.js"
import swaggerUi from "swagger-ui-express"

import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import commentRoutes from "./routes/comment.routes.js"

import globalErrHandler from "./controllers/error.controller.js"
import AppError from "./utils/appError.js"

import config from "./config/config.js"

const app = express()

// Allow Cross-Origin requests
app.use(cors({ origin: config.webapp.origin }))

// Set security HTTP headers
app.use(helmet())

// Limit request from the same API
const limiter = rateLimit({
  max: 2000,
  windowMs: 60 * 60 * 1000,
  message: "Too Many Request from this IP, please try again in an hour",
  // eslint-disable-next-line no-unused-vars
  handler: (req, res, next) => {
    res.status(500).send({
      message: "Too Many Request from this IP, please try again in an hour",
    })
  },
})

app.use("/api", limiter)

// Body parser, reading data from body into req.body
app.use(
  json({
    limit: "15kb",
  })
)

// Data sanitization
app.use(xss())

// Prevent parameter pollution
app.use(hpp())

app.use(express.json())

// SWAGGER API DOCS
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Routes
app.get("/", async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the Blog API",
  })
})
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)

// handle undefined Routes
app.use("*", (req, res, next) => {
  const err = new AppError(404, "fail", "undefined route")
  next(err, req, res, next)
})

app.use(globalErrHandler)

export default app
