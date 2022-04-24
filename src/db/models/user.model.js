import { Model } from "objection";
import Post from "./post.model.js";
import Comment from "./comment.model.js";

class User extends Model {
  static tableName = "users";

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "firstName",
        "lastName",
        "displayName",
        "email",
        "passwordHash",
        "passwordSalt",
        "role",
      ],

      properties: {
        id: { type: "integer" },
        firstName: { type: "string", minLength: 1, maxLength: 255 },
        lastName: { type: "string", minLength: 1, maxLength: 255 },
        displayName: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        passwordHash: { type: "string" },
        passwordSalt: { type: "string" },
        role: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: "users.id",
          to: "posts.authorId",
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "users.id",
          to: "comments.authorId",
        },
      },
    };
  }

  get isAdmin() {
    return this.role === "admin";
  }

  get isActive() {
    return this.activated;
  }
}

export default User;
