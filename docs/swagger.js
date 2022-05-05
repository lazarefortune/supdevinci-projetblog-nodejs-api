const swagger = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Blog project API Documentation",
    description: "A simple API documentation for this project",
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
  paths: {
    "/posts/admin": {
      get: {
        tags: ["Posts"],
        summary: "Get all posts as Admin",
        description: "Get all posts as Admin",
        operationId: "getPostsAdmin",
        produces: ["application/json"],
        parameters: [],
        responses: {
          200: {
            description: "Successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/Post",
              },
            },
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/posts": {
      get: {
        tags: ["Posts"],
        summary: "Get all posts",
        description: "Get all posts",
        operationId: "getPosts",
        produces: ["application/json"],
        parameters: [],
        responses: {
          200: {
            description: "Successful operation",
            schema: {
              type: "array",
              items: {
                $ref: "#/definitions/Post",
              },
            },
          },
          500: {
            description: "Internal server error",
          },
        },
      },
      post: {
        tags: ["Posts"],
        summary: "Create a new post",
        description: "Create a new post",
        operationId: "createPost",
        produces: ["application/json"],
        parameters: [
          {
            in: "content",
            name: "content",
            description: "Post object that needs to be added to the store",
            required: true,
            schema: {
              $ref: "#/definitions/Post",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            schema: {
              $ref: "#/definitions/Post",
            },
          },
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "Post not found",
          },
          409: {
            description: "Post already exists",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/posts/{id}": {
      get: {
        tags: ["Posts"],
        summary: "Get a single post",
        description: "Get a single post",
        operationId: "getPostById",
        produces: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of post to return",
            required: true,
            type: "integer",
            format: "int64",
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            schema: {
              $ref: "#/definitions/Post",
            },
          },
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "Post not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
      put: {
        tags: ["Posts"],
        summary: "Update a post",
        description: "Update a post",
        operationId: "updatePost",
        produces: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of post to return",
            required: true,
            type: "integer",
            format: "int64",
          },
          {
            in: "content",
            name: "content",
            description: "Post object that needs to be added to the store",
            required: true,
            schema: {
              $ref: "#/definitions/Post",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            schema: {
              $ref: "#/definitions/Post",
            },
          },
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "Post not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
      delete: {
        tags: ["Posts"],
        summary: "Delete a post",
        description: "Delete a post",
        operationId: "deletePost",
        produces: ["application/json"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of post to return",
            required: true,
            type: "integer",
            format: "int64",
          },
        ],
        responses: {
          200: {
            description: "Successful operation",
            schema: {
              $ref: "#/definitions/Post",
            },
          },
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "Post not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
  },
  definitions: {
    Post: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        title: {
          type: "string",
        },
        content: {
          type: "string",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
        authorId: {
          type: "integer",
          format: "int64",
        },
      },
    },
  },
}

export default swagger
