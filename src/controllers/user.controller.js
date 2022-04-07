import {
  createOne,
  findOneById,
  findAll,
  updateOneWithPatch,
  deleteOne,
  findAllPosts,
} from "../services/user.service.js";

import hashPassword from "../security/password/hashPassword.js";

import AppError from "../utils/appError.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await findAll(req.query);
    res.status(200).json(users);
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
    roleId,
  } = req.body;

  const [passwordHash, passwordSalt] = hashPassword(password);

  const datas = {
    firstName,
    lastName,
    displayName,
    email,
    passwordHash,
    passwordSalt,
    createdAt: createdAt || new Date(),
    updatedAt: updatedAt || new Date(),
    roleId: roleId || 3,
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

export const updatedUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    displayName,
    email,
    password,
    updatedAt,
    roleId,
  } = req.body;

  const datas = {
    firstName,
    lastName,
    displayName,
    email,
    updatedAt: updatedAt || new Date(),
    roleId: roleId || 3,
  };

  if (password) {
    const [passwordHash, passwordSalt] = hashPassword(password);
    datas.passwordHash = passwordHash;
    datas.passwordSalt = passwordSalt;
  }

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
