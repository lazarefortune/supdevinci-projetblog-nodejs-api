import { Model } from "objection";
import Role from "./Role.js";

class User extends Model {
  static tableName = "users";

  static get relationMappings() {
    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: "users.roleId",
          to: "roles.id",
        },
      },
    };
  }
}

export default User;
