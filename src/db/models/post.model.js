import { Model } from "objection";
import User from "./user.model.js";
import Comment from "./comment.model.js";

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
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "posts.id",
          to: "comments.postId",
        },
      },
    };
  }
}

export default Post;
