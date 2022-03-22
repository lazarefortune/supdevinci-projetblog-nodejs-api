import express from "express";
import knex from "knex";
import { Model } from "objection";
import config from "./config.js";
import allRoutes from "./src/routes/allRoutes.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

const db = knex(config.db);
const app = express();

Model.knex(db);

const PORT = config.port;

app.use(express.json());

app.use(cors({ origin: config.webapp.origin }));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Blog API",
      description: "Blog API informations",
      contact: {
        name: "Amazing developer",
      },
      servers: [{ url: "http://localhost/4000", description: "hello world" }],
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

allRoutes(app);

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
