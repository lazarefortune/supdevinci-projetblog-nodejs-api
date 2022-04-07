import {
  createOne,
  findOneById,
  findAll,
  updateOneWithPatch,
  deleteOne,
  findAllCommentsByPostId,
} from "../services/post.service.js";

import AppError from "../utils/appError.js";

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await findAll(req.query);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  const { title, content, isPublished, createdAt, updatedAt, authorId } =
    req.body;

  const datas = {
    title,
    content,
    isPublished,
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date(),
    authorId,
  };

  try {
    const post = await createOne(datas);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    if (!postId || !Number(postId)) {
      throw new AppError(404, "fail", "Missing post id");
    }

    const post = await findOneById(postId);

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const updatedPost = async (req, res, next) => {
  const { title, content, isPublished, updatedAt, authorId } = req.body;

  const datas = {
    title,
    content,
    isPublished,
    updatedAt: updatedAt || new Date(),
    authorId,
  };

  try {
    const postId = req.params.id;

    if (!postId || !Number(postId)) {
      throw new AppError(404, "fail", "Missing post id");
    }

    const post = await updateOneWithPatch(postId, datas);

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    if (!postId || !Number(postId)) {
      throw new AppError(404, "fail", "Missing post id");
    }

    await deleteOne(postId);

    res.status(200).send({
      status: "success",
      statusCode: 200,
      message: "Post deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPostComments = async (req, res, next) => {
  try {
    const postId = req.params.id;

    if (!postId || !Number(postId)) {
      throw new AppError(404, "fail", "Missing post id");
    }

    const comments = await findAllCommentsByPostId(postId);

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};