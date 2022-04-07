import Post from "../db/models/post.model.js";
import User from "../db/models/user.model.js";

import APIFeatures from "../utils/apiFeatures.js";
import appError from "../utils/appError.js";

const findOneByTitle = async (title) => {
  const post = await Post.query().findOne({ title });
  return post;
};

export const findAll = async (queryString) => {
  try {
    const features = new APIFeatures(Post.query(), queryString)
      .limit()
      .sort()
      .paginate();

    const Posts = await features.query;
    return Posts;
  } catch (error) {
    throw error;
  }
};

export const createOne = async (datas) => {
  try {
    const postExist = await findOneByTitle(datas.title);

    if (postExist) {
      throw new appError(409, "fail", "Post already exist");
    }

    const user = await User.query().findById(datas.authorId);

    if (!user) {
      throw new appError(404, "fail", "No user found with that id");
    }

    return Post.query().insert(datas);
  } catch (error) {
    throw error;
  }
};

export const findOneById = async (postId) => {
  try {
    const post = await Post.query()
      .withGraphFetched("[author]")
      .findById(postId);
    if (!post) {
      throw new appError(404, "fail", "No Post found with that id");
    }
    return post;
  } catch (error) {
    throw error;
  }
};

export const updateOneWithPatch = async (postId, datas) => {
  try {
    const oldPost = await Post.query().findById(postId);
    if (!oldPost) {
      throw new appError(404, "fail", "No post found with that id");
    }

    if (datas.title) {
      const postExist = await findOneByTitle(datas.title);

      if (postExist && postExist.id !== Number(postId)) {
        throw new appError(409, "fail", "title already exist");
      }
    }

    if (datas.authorId) {
      const user = await User.query().findById(datas.authorId);

      if (!user) {
        throw new appError(404, "fail", "No user found with that id");
      }
    }

    const post = await Post.query().patchAndFetchById(postId, datas);
    return post;
  } catch (error) {
    throw error;
  }
};

export const deleteOne = async (postId) => {
  try {
    const post = await Post.query().findById(postId);
    if (!post) {
      throw new appError(404, "fail", "No post found with that id");
    }
    await post.$query().delete();
  } catch (error) {
    throw error;
  }
};

export const findAllCommentsByPostId = async (postId) => {
  try {
    const post = await Post.query().findById(postId);
    if (!post) {
      throw new appError(404, "fail", "No post found with that id");
    }
    return post.$relatedQuery("comments");
  } catch (error) {
    throw error;
  }
};
