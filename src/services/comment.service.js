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
      .withGraphFetched("author")
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

    if (datas.authorId) {
      const userMatch = await User.query().findById(datas.authorId);

      if (!userMatch) {
        throw new appError(404, "fail", "No user found with that id");
      }
    }

    if (datas.postId) {
      const postMatch = await Post.query().findById(datas.postId);

      if (!postMatch) {
        throw new appError(404, "fail", "No post found with that id");
      }
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
