const swagger = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "API Documentation",
    description:
      "A simple API documentation for a Node.js and Express.js application about blog",
    contact: {
      name: "Lazare Fortune",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  host: "localhost:4000",
  basePath: "/api",
  tags: [
    {
      name: "Posts",
      description: "Everything about posts",
    },
  ],
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
}

export default swagger
