import { Model } from "objection";
import Post from "./post.model.js";
import User from "./user.model.js";

class Comment extends Model {
  static tableName = "comments";

  static get relationMappings() {
    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        filter: (query) => query.select("id", "title"),
        join: {
          from: "comments.postId",
          to: "posts.id",
        },
      },

      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        filter: (query) =>
          query.select("id", "firstName", "lastName", "displayName"),
        join: {
          from: "comments.authorId",
          to: "users.id",
        },
      },
    };
  }
}

export default Comment;
