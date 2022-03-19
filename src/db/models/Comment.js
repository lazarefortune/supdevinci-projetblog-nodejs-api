import { Model } from "objection";
import Post from "./Post.js";
import User from "./User.js";

class Comment extends Model {
  static tableName = "comments";

  static get relationMappings() {
    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: "comments.postId",
          to: "posts.id",
        },
      },

      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.authorId",
          to: "users.id",
        },
      },
    };
  }
}

export default Comment;
