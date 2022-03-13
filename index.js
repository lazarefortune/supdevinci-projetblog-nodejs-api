import express from "express";
import knex from "knex";
import { Model } from "objection";
import config from "./config.js";
import allRoutes from "./src/routes/allRoutes.js";

const db = knex(config.db);
const app = express();

Model.knex(db);

const PORT = config.port;

allRoutes(app);

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
