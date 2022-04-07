import { Model } from "objection";
import User from "./user.model.js";

class Post extends Model {
  static tableName = "posts";

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "posts.authorId",
          to: "users.id",
        },
      },
    };
  }
}

export default Post;
