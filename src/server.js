import knex from "knex"
import { Model } from "objection"
import config from "./config/config.js"
import app from "./app.js"

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...")
  console.log(err.name, err.message)
  process.exit(1)
})

// Connect the database
const db = knex(config.db)
Model.knex(db)

// db.select()
//   .from("knex_migrations")
//   .then(() => {
//     console.log("Connection to database success 👍");
//   });

// Start the server
const PORT = config.port

app.listen(PORT, () => {
  console.log(`Environment: ${config.environment}`)
  console.log(`🎉 Listening on port ${PORT}`)
})

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!!!  shutting down ...")
  console.log(err.name, err.message)
  // eslint-disable-next-line no-undef
  server.close(() => {
    process.exit(1)
  })
})

export default app
