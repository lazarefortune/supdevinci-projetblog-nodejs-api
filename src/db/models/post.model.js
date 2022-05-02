import { Model } from "objection"
import User from "./user.model.js"
import Comment from "./comment.model.js"

class Post extends Model {
  static tableName = "posts"

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "content", "isPublished", "authorId"],

      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        content: { type: "string" },
        isPublished: { type: "integer", minimum: 0, maximum: 1 },
        authorId: { type: "integer" },
      },
    }
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        filter: (query) =>
          query.select("id", "firstName", "lastName", "displayName"),
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
    }
  }

  get isPublic() {
    return this.isPublished === 1
  }
}

export default Post
