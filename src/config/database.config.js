import "dotenv/config";

const env = process.env;

let connection = {};

if (env.NODE_ENV == "production") {
  connection = {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  };
}

if (env.NODE_ENV == "development") {
  connection = {
    host: env.DB_HOST_DEV,
    port: env.DB_PORT_DEV,
    user: env.DB_USER_DEV,
    password: env.DB_PASSWORD_DEV,
    database: env.DB_NAME_DEV,
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

export default {
  client: env.DB_CLIENT,
  connection,
  migrations: {
    directory: "./src/db/migrations/",
  },
  seeds: {
    directory: "./src/db/seeds/",
  },
};
