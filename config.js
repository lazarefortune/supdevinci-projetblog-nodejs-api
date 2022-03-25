import "dotenv/config";
import * as yup from "yup";

const schema = yup.object().shape({
  port: yup.number().integer().positive().min(80).max(65535).required(),
  db: yup.object().shape({
    client: yup.string().oneOf(["mysql", "mysql2", "pg"]).required(),
    connection: yup.object().shape({
      host: yup.string().required(),
      port: yup.number().integer().positive().min(80).max(65535).required(),
      user: yup.string().required(),
      password: yup.string().required(),
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
    origin: yup.string().required(),
  }),
});

const env = process.env;

let connection = {};

if (env.NODE_ENV == "development" || env.NODE_ENV == "production") {
  connection = {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  };
}

if (env == "test") {
  connection = {
    host: env.DB_HOST_TEST,
    port: env.DB_PORT_TEST,
    user: env.DB_USER_TEST,
    password: env.DB_PASSWORD_TEST,
    database: env.DB_NAME_TEST,
  };
}

const data = {
  environment: env.NODE_ENV,
  port: env.APP_PORT,
  db: {
    client: env.DB_CLIENT,
    connection,
    migrations: {
      directory: "./src/db/migrations/",
    },
    seeds: {
      directory: "./src/db/seeds/",
    },
  },
  security: {
    password: {
      pepper: env.SECURITY_PASSWORD_PEPPER,
      iteration: 10000,
      keylen: 512,
      digest: "sha512",
    },
    session: {
      secret: env.SECURITY_SESSION_SECRET,
      expireAfter: "3 days",
    },
  },
  webapp: {
    origin: env.WEBAPP_ORIGIN,
  },
};

const config = schema.validateSync(data);
export default config;
