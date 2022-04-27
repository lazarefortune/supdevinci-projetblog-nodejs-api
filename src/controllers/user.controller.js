import * as userService from "../services/user.service.js";
import * as postService from "../services/post.service.js";

import AppError from "../utils/appError.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const {
      session: {
        user: { id: currentUserId },
      },
    } = req;

    await userService.canAccessUser("user:readAll", currentUserId);

    const users = await userService.findAll(req.query);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(400, "fail", "Email and password are required");
    }

    const [user, token] = await userService.signIn(email, password);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    displayName,
    email,
    password,
    createdAt,
    updatedAt,
    role,
  } = req.body;

  const datas = {
    firstName,
    lastName,
    displayName,
    email,
    password,
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date(),
    role: role || "reader",
  };

  try {
    const user = await userService.createOne(datas);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const {
      params: { id: userId },
      session: {
        user: { id: currentUserId },
      },
    } = req;

    if (!userId || !Number(userId)) {
      throw new AppError(404, "fail", "Missing user id");
    }

    await userService.canAccessUser("user:read", currentUserId, userId);

    const user = await userService.findOneById(userId);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const {
      params: { id: userId },
      body: { firstName, lastName, displayName, email, updatedAt },
      session: {
        user: { id: currentUserId },
      },
    } = req;

    await userService.canAccessUser("user:update", currentUserId, userId);

    const datas = {
      firstName,
      lastName,
      displayName,
      email,
      updatedAt: updatedAt || new Date(),
    };

    if (!userId || !Number(userId)) {
      throw new AppError(404, "fail", "Missing user id");
    }

    const user = await userService.updateOneWithPatch(userId, datas);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserPassword = async (req, res, next) => {
  try {
    const {
      params: { id: userId },
      body: { oldPassword, newPassword },
      session: {
        user: { id: currentUserId },
      },
    } = req;

    if (!userId || !Number(userId)) {
      throw new AppError(400, "fail", "Missing user id");
    }

    await userService.canAccessUser(
      "user:updatePassword",
      currentUserId,
      userId
    );

    if (!oldPassword) {
      throw new AppError(400, "fail", "Missing old password");
    }

    if (!newPassword) {
      throw new AppError(400, "fail", "Missing new password");
    }

    await userService.updatePassword(userId, oldPassword, newPassword);

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Password updated",
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserAccountStatus = async (req, res, next) => {
  try {
    const {
      params: { id: userId },
      body: { status },
      session: {
        user: { id: currentUserId },
      },
    } = req;

    if (!userId || !Number(userId)) {
      throw new AppError(400, "fail", "Missing user id");
    }

    await userService.canAccessUser(
      "user:updateAccountStatus",
      currentUserId,
      userId
    );

    if (status === undefined) {
      throw new AppError(400, "fail", "Missing status");
    }

    if (typeof status !== "boolean") {
      throw new AppError(400, "fail", "Status must be a boolean");
    }

    const user = await userService.updateAccountStatus(userId, status);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const {
      params: { id: userId },
      session: {
        user: { id: currentUserId },
      },
    } = req;

    await userService.canAccessUser("user:delete", currentUserId, userId);

    if (!userId || !Number(userId)) {
      throw new AppError(404, "fail", "Missing user id");
    }

    await userService.deleteOne(userId);

    res.status(200).send({
      status: "success",
      statusCode: 200,
      message: "User deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const allUserPosts = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!userId || !Number(userId)) {
      throw new AppError(404, "fail", "Missing user id");
    }

    const posts = await userService.findAllPosts(userId);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const allUserPostsAsAdmin = async (req, res, next) => {
  try {
    const {
      params: { id: userId },
      session: {
        user: { id: currentUserId },
      },
    } = req;

    if (!userId || !Number(userId)) {
      throw new AppError(404, "fail", "Missing user id");
    }

    await postService.canAccessPost("readAllAsAdmin", currentUserId);

    const posts = await userService.findAllPosts(userId, true);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const allUserComments = async (req, res, next) => {
  try {
    const {
      params: { id: userId },
      session: {
        user: { id: currentUserId },
      },
    } = req;

    if (!userId || !Number(userId)) {
      throw new AppError(404, "fail", "Missing user id");
    }

    // TODO: Use canAccessComment instead of canAccessPost
    await postService.canAccessPost("readAllAsAdmin", currentUserId);

    const posts = await userService.findAllComments(userId);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
