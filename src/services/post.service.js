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

export const findAllCommentsByPostId = async (postId, asPublic = false) => {
  try {
    const post = await Post.query().findById(postId);
    if (!post) {
      throw new appError(404, "fail", "No post found with that id");
    }
    if (asPublic && !post.isPublic) {
      throw new appError(403, "fail", "You are not authorized");
    }
    return post.$relatedQuery("comments").withGraphFetched("author");
  } catch (error) {
    throw error;
  }
};

const isGranted = (action, user, post = null) => {
  if (user.role === "admin") {
    return true;
  }

  let isAuthorized = false;

  if (action === "readAllAsAdmin") {
    return isAuthorized;
  }

  if (post === null && action !== "create") {
    return isAuthorized;
  }

  switch (action) {
    case "create":
      const allowedRolesToCreate = ["author"];
      if (allowedRolesToCreate.includes(user.role)) {
        isAuthorized = true;
      }
      break;
    case "readOne":
      const allowedRolesToReadOne = ["author", "reader"];
      if (
        (post.isPublic && allowedRolesToReadOne.includes(user.role)) ||
        (post.authorId === user.id && allowedRolesToReadOne.includes(user.role))
      ) {
        isAuthorized = true;
      }
      break;
    case "update":
      const allowedRolesToUpdate = ["author"];

      if (
        allowedRolesToUpdate.includes(user.role) &&
        post.authorId === user.id
      ) {
        isAuthorized = true;
      }
      break;
    case "delete":
      const allowedRolesToDelete = ["author"];
      if (
        allowedRolesToDelete.includes(user.role) &&
        post.authorId === user.id
      ) {
        isAuthorized = true;
      }
      break;
    default:
      break;
  }
  return isAuthorized;
};

export const canAccessPost = async (action, userId, postId = null) => {
  try {
    const user = await User.query().findById(userId);
    if (!user) {
      throw new appError(404, "fail", "No user found with that id");
    }

    let post = null;

    if (postId) {
      post = await Post.query().findById(postId);
      if (!post) {
        throw new appError(404, "fail", "No post found with that id");
      }
    }

    if (!isGranted(action, user, post)) {
      throw new appError(
        403,
        "fail",
        `You are not authorized to ${action} post`
      );
    }
  } catch (error) {
    throw error;
  }
};

export const searchPosts = async (queryString) => {
  try {
    // Rechercher des posts par title
    const posts = await Post.query()
      .where("title", "like", `%${queryString}%`)
      .andWhere("isPublished", 1);

    return posts;
  } catch (error) {
    throw error;
  }
};