import { Model } from "objection";
import Role from "./role.model.js";
import Post from "./post.model.js";

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
        "roleId",
      ],

      properties: {
        id: { type: "integer" },
        firstName: { type: "string", minLength: 1, maxLength: 255 },
        lastName: { type: "string", minLength: 1, maxLength: 255 },
        displayName: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        passwordHash: { type: "string" },
        passwordSalt: { type: "string" },
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
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        filter: (query) => query.select("id", "name"),
        join: {
          from: "users.roleId",
          to: "roles.id",
        },
      },
    };
  }
}

export default User;
