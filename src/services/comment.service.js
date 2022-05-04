import Comment from "../db/models/comment.model.js"
import Post from "../db/models/post.model.js"
import User from "../db/models/user.model.js"

import APIFeatures from "../utils/apiFeatures.js"
import AppError from "../utils/appError.js"

export const findAll = async (queryString) => {
  try {
    const features = new APIFeatures(Comment.query(), queryString)
      .limit()
      .sort()
      .paginate()

    const comments = await features.query
    return comments
  } catch (error) {
    throw error
  }
}

export const createOne = async (datas) => {
  try {
    const user = await User.query().findById(datas.authorId)

    if (!user) {
      throw new AppError(404, "fail", "No user found with that id")
    }

    const post = await Post.query().findById(datas.postId)

    if (!post) {
      throw new AppError(404, "fail", "No post found with that id")
    }

    return Comment.query().insert(datas)
  } catch (error) {
    throw error
  }
}

export const findOneById = async (commentId) => {
  try {
    const comment = await Comment.query()
      .withGraphFetched("[author, post]")
      .findById(commentId)
    if (!comment) {
      throw new AppError(404, "fail", "No Comment found with that id")
    }
    return comment
  } catch (error) {
    throw error
  }
}

export const updateOneWithPatch = async (commentId, datas) => {
  try {
    const commentMatch = await Comment.query().findById(commentId)
    if (!commentMatch) {
      throw new AppError(404, "fail", "No comment found with that id")
    }

    const comment = await Comment.query()
      .patchAndFetchById(commentId, datas)
      .withGraphFetched("[author, post]")
    return comment
  } catch (error) {
    throw error
  }
}

export const deleteOne = async (commentId) => {
  try {
    const comment = await Comment.query().findById(commentId)
    if (!comment) {
      throw new AppError(404, "fail", "No comment found with that id")
    }
    await comment.$query().delete()
  } catch (error) {
    throw error
  }
}

// TODO: Dirty code - Help me !! - I need Refactor
const isGranted = async (action, user, comment = null) => {
  const allowedActions = [
    "comment:readAll",
    "comment:readAllOfOnePost",
    "comment:read",
    "comment:update",
    "comment:delete",
  ]

  if (!allowedActions.includes(action)) {
    return false
  }

  if (user.role === "admin") {
    return true
  }

  if (action === "comment:readAll" && comment !== null) {
    return false
  }

  if (comment === null) {
    return false
  }

  if (action === "comment:readAllOfOnePost") {
    if (comment.post.isPublic === true || comment.post.authorId === user.id) {
      return true
    }
    return false
  }

  if (comment.post.isPublic === true && comment.authorId === user.id) {
    return true
  }

  if (comment.post.authorId === user.id) {
    return true
  }

  return false
}

export const canAccessComment = async (action, userId, targetCommentId) => {
  try {
    const user = await User.query().findById(userId)
    if (!user) {
      throw new AppError(404, "fail", "No user found with that id")
    }

    let comment = null
    if (targetCommentId) {
      comment = await Comment.query()
        .withGraphFetched("[post, author]")
        .findById(targetCommentId)

      if (!comment) {
        throw new AppError(404, "fail", "No comment found with that id")
      }
    }

    if (!(await isGranted(action, user, comment))) {
      throw new AppError(403, "fail", `You are not allowed to ${action}`)
    }

    return true
  } catch (error) {
    throw error
  }
}
