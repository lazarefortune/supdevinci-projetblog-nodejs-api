import {
  createOne,
  findOneById,
  findAll,
  updateOneWithPatch,
  deleteOne,
  findAllPosts,
  findAllComments,
  signIn,
  updatePassword,
} from "../services/user.service.js";

import AppError from "../utils/appError.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await findAll(req.query);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [user, token] = await signIn(email, password);

    res.status(200).json({
      status: "success",
      token,
      user,
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
    const user = await createOne(datas);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!userId || !Number(userId)) {
      throw new AppError(404, "fail", "Missing user id");
    }

    const user = await findOneById(userId);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { firstName, lastName, displayName, email, updatedAt } = req.body;

  const datas = {
    firstName,
    lastName,
    displayName,
    email,
    updatedAt: updatedAt || new Date(),
  };

  try {
    const userId = req.params.id;

    if (!userId || !Number(userId)) {
      throw new AppError(404, "fail", "Missing user id");
    }

    const user = await updateOneWithPatch(userId, datas);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserPassword = async (req, res, next) => {
  const {
    params: { id: userId },
    body: { oldPassword, newPassword },
    session: {
      user: { id: sessionUserId },
    },
  } = req;

  try {
    if (Number(sessionUserId) !== Number(userId)) {
      throw new AppError(
        401,
        "fail",
        "You are not authorized to access this user"
      );
    }

    if (!userId || !Number(userId)) {
      throw new AppError(400, "fail", "Missing user id");
    }

    if (!oldPassword) {
      throw new AppError(400, "fail", "Missing old password");
    }

    if (!newPassword) {
      throw new AppError(400, "fail", "Missing new password");
    }

    await updatePassword(userId, oldPassword, newPassword);

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Password updated",
    });
  } catch (error) {
    next(error);
  }
};


export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!userId || !Number(userId)) {
      throw new AppError(404, "fail", "Missing user id");
    }

    await deleteOne(userId);

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

    const posts = await findAllPosts(userId);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const allUserComments = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!userId || !Number(userId)) {
      throw new AppError(404, "fail", "Missing user id");
    }

    const posts = await findAllComments(userId);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
