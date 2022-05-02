import "dotenv/config"
import * as yup from "yup"

import securityConfig from "./security.config.js"
import databaseConfig from "./database.config.js"

const schema = yup.object().shape({
  environment: yup
    .string()
    .oneOf(["production", "development", "test"])
    .required(),
  port: yup.number().integer().positive().min(80).max(65535).required(),
  db: yup.object().shape({
    client: yup.string().oneOf(["mysql", "mysql2", "pg"]).required(),
    connection: yup.object().shape({
      host: yup.string().required(),
      port: yup.number().integer().positive().min(80).max(65535).required(),
      user: yup.string().required(),
      password: yup.string(),
      database: yup.string().required(),
    }),
    migrations: yup.object().shape({
      directory: yup.string().required(),
    }),
    seeds: yup.object().shape({
      directory: yup.string(),
    }),
  }),
  security: yup.object().shape({
    password: yup.object().shape({
      pepper: yup.string().required(),
      iteration: yup.number().min(10000).required(),
      keylen: yup.number().oneOf([512]).required(),
      digest: yup.string().oneOf(["sha512", "sha256"]).required(),
    }),
    session: yup.object().shape({
      secret: yup.string().required(),
      expireAfter: yup.string().oneOf(["2 days", "3 days"]),
    }),
  }),
  webapp: yup.object().shape({
    origin: yup.array().of(yup.string()).required(),
  }),
})

const env = process.env

const data = {
  environment: env.NODE_ENV,
  port: env.APP_PORT,
  db: databaseConfig,
  security: securityConfig,
  webapp: {
    origin: env.WEB_APP_ALLOWED_ORIGINS,
  },
}

const config = schema.validateSync(data)
export default config
