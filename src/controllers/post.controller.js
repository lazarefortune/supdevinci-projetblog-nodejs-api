import * as postService from "../services/post.service.js"

import AppError from "../utils/appError.js"

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.findAll(req.query)
    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
}

export const getAllPostsAsAdmin = async (req, res, next) => {
  try {
    const {
      session: {
        user: { id: currentUserId },
      },
    } = req

    await postService.canAccessPost("readAllAsAdmin", currentUserId)

    const posts = await postService.findAll(req.query, true)
    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
}

export const createPost = async (req, res, next) => {
  try {
    const {
      body: { title, content, isPublished, createdAt, updatedAt },
      session: {
        user: { id: currentUserId },
      },
    } = req

    await postService.canAccessPost("create", currentUserId)

    const datas = {
      title,
      content,
      isPublished,
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
      authorId: currentUserId,
    }

    const post = await postService.createOne(datas)
    res.status(201).json(post)
  } catch (error) {
    next(error)
  }
}

export const getPost = async (req, res, next) => {
  try {
    const {
      params: { id: postId },
      session: {
        user: { id: currentUserId },
      },
    } = req

    await postService.canAccessPost("readOne", currentUserId, postId)

    if (!postId || !Number(postId)) {
      throw new AppError(404, "fail", "Missing post id")
    }

    const post = await postService.findOneById(postId)

    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

export const updatedPost = async (req, res, next) => {
  try {
    const {
      body: { title, content, isPublished, updatedAt },
      params: { id: postId },
      session: {
        user: { id: currentUserId },
      },
    } = req

    await postService.canAccessPost("update", currentUserId, postId)

    const datas = {
      title,
      content,
      isPublished,
      updatedAt: updatedAt || new Date(),
    }

    if (!postId || !Number(postId)) {
      throw new AppError(404, "fail", "Missing post id")
    }

    const post = await postService.updateOneWithPatch(postId, datas)

    res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const {
      params: { id: postId },
      session: {
        user: { id: currentUserId },
      },
    } = req

    if (!postId || !Number(postId)) {
      throw new AppError(404, "fail", "Missing post id")
    }

    await postService.canAccessPost("delete", currentUserId, postId)

    await postService.deleteOne(postId)

    res.status(200).send({
      status: "success",
      statusCode: 200,
      message: "Post deleted",
    })
  } catch (error) {
    next(error)
  }
}

export const getAllPostComments = async (req, res, next) => {
  try {
    const {
      params: { id: postId },
      session: {
        user: { id: currentUserId },
      },
    } = req

    await postService.canAccessPost("readOne", currentUserId, postId)

    if (!postId || !Number(postId)) {
      throw new AppError(404, "fail", "Missing post id")
    }

    const comments = await postService.findAllCommentsByPostId(postId)

    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
}

export const searchPosts = async (req, res, next) => {
  try {
    const {
      body: { search: searchString },
    } = req
    const posts = await postService.searchPosts(searchString)
    res.status(200).json(posts)
  } catch (error) {
    next(error)
  }
}
