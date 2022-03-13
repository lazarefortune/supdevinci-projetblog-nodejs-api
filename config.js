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
});

const data = {
  port: process.env.APP_PORT,
  db: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: "./src/db/migrations/",
    },
    seeds: {
      directory: "./src/db/seeds/",
    },
  },
  security: {
    password: {
      pepper: process.env.SECURITY_PASSWORD_PEPPER,
      iteration: 10000,
      keylen: 512,
      digest: "sha512",
    },
    session: {
      secret: process.env.SECURITY_SESSION_SECRET,
      expireAfter: "3 days",
    },
  },
};

const config = schema.validateSync(data);
export default config;
