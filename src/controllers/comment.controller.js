import {
  createOne,
  findOneById,
  findAll,
  updateOneWithPatch,
  deleteOne,
} from "../services/comment.service.js";

import AppError from "../utils/appError.js";

export const getAllComments = async (req, res, next) => {
  try {
    const comments = await findAll(req.query);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  const { content, createdAt, updatedAt, authorId, postId } = req.body;

  try {
    if (!content || !createdAt || !updatedAt || !authorId || !postId) {
      throw new AppError(400, "fail", "Missing required fields");
    }

    const datas = {
      content,
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
      authorId,
      postId,
    };

    const comment = await createOne(datas);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;

    if (!commentId || !Number(commentId)) {
      throw new AppError(400, "fail", "Missing comment id");
    }

    const comment = await findOneById(commentId);

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const updatedComment = async (req, res, next) => {
  const { content, updatedAt, authorId, postId } = req.body;

  try {
    if (!authorId || !postId) {
      throw new AppError(
        400,
        "fail",
        "Missing required author or post id fields"
      );
    }
    const datas = {
      content,
      updatedAt: updatedAt || new Date(),
      authorId: Number(authorId),
      postId: Number(postId),
    };

    const commentId = req.params.id;

    if (!commentId || !Number(commentId)) {
      throw new AppError(400, "fail", "Missing comment id");
    }

    const comment = await updateOneWithPatch(Number(commentId), datas);

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;

    if (!commentId || !Number(commentId)) {
      throw new AppError(404, "fail", "Missing comment id");
    }

    await deleteOne(commentId);

    res.status(200).send({
      status: "success",
      statusCode: 200,
      message: "Comment deleted",
    });
  } catch (error) {
    next(error);
  }
};
