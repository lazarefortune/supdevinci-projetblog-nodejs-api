import * as commentService from "../services/comment.service.js";

import AppError from "../utils/appError.js";

export const getAllComments = async (req, res, next) => {
  try {
    const {
      session: {
        user: { id: authorId },
      },
    } = req;

    await commentService.canAccessComment("comment:readAll", authorId);

    const comments = await commentService.findAll(req.query);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const {
      body: { content, createdAt, updatedAt, postId },
      session: {
        user: { id: authorId },
      },
    } = req;

    if (!content || !authorId || !postId) {
      throw new AppError(400, "fail", "Missing required fields");
    }

    const datas = {
      content,
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
      authorId,
      postId,
    };

    const comment = await commentService.createOne(datas);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req, res, next) => {
  try {
    const {
      params: { id: commentId },
      session: {
        user: { id: currentUserId },
      },
    } = req;

    if (!commentId || !Number(commentId)) {
      throw new AppError(400, "fail", "Missing comment id");
    }

    await commentService.canAccessComment(
      "comment:read",
      currentUserId,
      commentId
    );

    const comment = await commentService.findOneById(commentId);

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const updatedComment = async (req, res, next) => {
  try {
    const {
      body: { content, updatedAt },
      params: { id: commentId },
      session: {
        user: { id: currentUserId },
      },
    } = req;

    await commentService.canAccessComment(
      "comment:update",
      currentUserId,
      commentId
    );

    const datas = {
      content,
      updatedAt: updatedAt || new Date(),
    };

    if (!commentId || !Number(commentId)) {
      throw new AppError(400, "fail", "Missing comment id");
    }

    const comment = await commentService.updateOneWithPatch(
      Number(commentId),
      datas
    );

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const {
      params: { id: commentId },
      session: {
        user: { id: currentUserId },
      },
    } = req;

    if (!commentId || !Number(commentId)) {
      throw new AppError(404, "fail", "Missing comment id");
    }

    await commentService.canAccessComment(
      "comment:delete",
      currentUserId,
      commentId
    );

    await commentService.deleteOne(commentId);

    res.status(200).send({
      status: "success",
      statusCode: 200,
      message: "Comment deleted",
    });
  } catch (error) {
    next(error);
  }
};
