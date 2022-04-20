import Post from "../db/models/post.model.js";
import User from "../db/models/user.model.js";

import APIFeatures from "../utils/apiFeatures.js";
import appError from "../utils/appError.js";

const findOneByTitle = async (title) => {
  const post = await Post.query().findOne({ title });
  return post;
};

export const findAll = async (queryString, findAsAdmin = false) => {
  try {
    let features = null;
    if (findAsAdmin) {
      features = new APIFeatures(
        Post.query().withGraphFetched("author"),
        queryString
      )
        .limit()
        .sort()
        .paginate();
    } else {
      features = new APIFeatures(
        Post.query().withGraphFetched("author").where("isPublished", 1),
        queryString
      )
        .limit()
        .sort()
        .paginate();
    }

    const posts = await features.query;
    return posts;
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

    if (!datas.authorId) {
      throw new appError(400, "fail", "Missing authorId");
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

export const findOneById = async (postId, isUserAuthenticate = true) => {
  try {
    let post = null;
    if (isUserAuthenticate) {
      post = await Post.query().withGraphFetched("[author]").findById(postId);
    } else {
      post = await Post.query()
        .withGraphFetched("[author]")
        .where("isPublished", 1)
        .findById(postId);
    }
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

export const findAllCommentsByPostIdWithoutAuth = async (postId) => {
  try {
    let post = null;
    post = await Post.query().where("isPublished", 1).findById(postId);
    if (!post) {
      throw new appError(404, "fail", "No post found with that id");
    }
    return post.$relatedQuery("comments").withGraphFetched("author");
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

    if (["readAll"].includes(action)) {
      return true;
    }

    const allowRolesToCreatePost = ["author"];

    if (action === "create" && allowRolesToCreatePost.includes(user.role)) {
      return true;
    }

    if (ressourceId) {
      const ressourcePost = await Post.query().findById(ressourceId);
      if (!ressourcePost) {
        throw new appError(404, "fail", "No ressource found with that id");
      }

      if (action == "readOne" && ressourcePost.isPublic === true) {
        return true;
      }

      if (ressourcePost.authorId === user.id) {
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