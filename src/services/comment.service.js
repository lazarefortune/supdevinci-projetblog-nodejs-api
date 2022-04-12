import Comment from "../db/models/comment.model.js";
import Post from "../db/models/post.model.js";
import User from "../db/models/user.model.js";

import APIFeatures from "../utils/apiFeatures.js";
import appError from "../utils/appError.js";

export const findAll = async (queryString) => {
  try {
    const features = new APIFeatures(Comment.query(), queryString)
      .limit()
      .sort()
      .paginate();

    const comments = await features.query;
    return comments;
  } catch (error) {
    throw error;
  }
};

export const createOne = async (datas) => {
  try {
    const user = await User.query().findById(datas.authorId);

    if (!user) {
      throw new appError(404, "fail", "No user found with that id");
    }

    const post = await Post.query().findById(datas.postId);

    if (!post) {
      throw new appError(404, "fail", "No post found with that id");
    }

    return Comment.query().insert(datas);
  } catch (error) {
    throw error;
  }
};

export const findOneById = async (commentId) => {
  try {
    const comment = await Comment.query()
      .withGraphFetched("[author, post]")
      .findById(commentId);
    if (!comment) {
      throw new appError(404, "fail", "No Comment found with that id");
    }
    return comment;
  } catch (error) {
    throw error;
  }
};

export const updateOneWithPatch = async (commentId, datas) => {
  try {
    const commentMatch = await Comment.query().findById(commentId);
    if (!commentMatch) {
      throw new appError(404, "fail", "No comment found with that id");
    }

    const comment = await Comment.query().patchAndFetchById(commentId, datas);
    return comment;
  } catch (error) {
    throw error;
  }
};

export const deleteOne = async (commentId) => {
  try {
    const comment = await Comment.query().findById(commentId);
    if (!comment) {
      throw new appError(404, "fail", "No comment found with that id");
    }
    await comment.$query().delete();
  } catch (error) {
    throw error;
  }
};

export const checkSecurityAccessRessource = async (
  action,
  userId,
  ressourceId = null
) => {
  try {
    const user = await User.query().findById(userId);
    if (!user) {
      throw new appError(404, "fail", "No user found with that id");
    }

    const allowedActions = [
      "readAllAsAdmin",
      "readAll",
      "readOne",
      "create",
      "update",
      "delete",
    ];

    if (!allowedActions.includes(action)) {
      throw new appError(400, "fail", "Invalid action");
    }

    if (user.role === "admin") {
      return true;
    }

    if (action === "readAllAsAdmin") {
      throw new appError(403, "fail", "You are not allowed to read all posts");
    }

    // Everyone can create a comment
    if (action === "create") {
      return true;
    }

    if (ressourceId) {
      const ressourceComment = await Comment.query()
        .withGraphFetched("[post, author]")
        .findById(ressourceId);

      if (!ressourceComment) {
        throw new appError(404, "fail", "No ressource found with that id");
      }

      if (action == "readOne" && ressourceComment.post.isPublic === true) {
        return true;
      }

      if (
        ["update", "delete"].includes(action) &&
        ressourceComment.authorId == user.id &&
        ressourceComment.post.isPublic
      ) {
        return true;
      }

      if (action == "delete" && ressourceComment.post.authorId === user.id) {
        return true;
      }
    }

    throw new appError(
      401,
      "fail",
      `You are not authorized to ${action} a ressource`
    );
  } catch (error) {
    throw error;
  }
};