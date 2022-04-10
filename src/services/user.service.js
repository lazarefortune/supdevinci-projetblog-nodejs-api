import jsonwebtoken from "jsonwebtoken";
import config from "../config/config.js";
import User from "../db/models/user.model.js";

import APIFeatures from "../utils/apiFeatures.js";
import appError from "../utils/appError.js";

import {
  hashPassword,
  comparePassword,
} from "../security/password/password.js";

export const findOneByField = async (field, value) => {
  const user = await User.query().findOne({ [field]: value });
  return user;
};

export const findAll = async (queryString) => {
  try {
    const features = new APIFeatures(User.query(), queryString)
      .limit()
      .sort()
      .paginate();

    const users = await features.query;
    return users;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const user = await findOneByField("email", email);

    if (!user) {
      throw new appError(401, "fail", "Invalid email or password");
    }

    const isPasswordValid = comparePassword(
      password,
      user.passwordHash,
      user.passwordSalt
    );

    if (!isPasswordValid) {
      throw new appError(401, "fail", "Invalid email or password");
    }

    const token = jsonwebtoken.sign(
      { payload: { userId: user.id } },
      config.security.session.secret,
      { expiresIn: config.security.session.expireAfter }
    );

    return [user, token];
  } catch (error) {
    throw error;
  }
};

export const createOne = async (datas) => {
  try {
    const isUserExist = await findOneByField("email", datas.email);

    if (isUserExist) {
      throw new appError(409, "fail", "User already exist");
    }

    const [passwordHash, passwordSalt] = hashPassword(datas.password);

    datas.passwordHash = passwordHash;
    datas.passwordSalt = passwordSalt;

    delete datas.password;

    return User.query().insert(datas);
  } catch (error) {
    throw error;
  }
};

export const findOneById = async (userId) => {
  try {
    const user = await User.query().findById(userId);
    if (!user) {
      throw new appError(404, "fail", "No user found with that id");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateOneWithPatch = async (userId, datas) => {
  try {
    const ifUserExist = await User.query().findById(userId);
    if (!ifUserExist) {
      throw new appError(404, "fail", "No user found with that id");
    }

    if (datas.email) {
      const userWithSameEmail = await findOneByField("email", datas.email);

      if (userWithSameEmail && userWithSameEmail.id !== Number(userId)) {
        throw new appError(409, "fail", "email already exist");
      }
    }

    const user = await User.query().patchAndFetchById(userId, datas);
    return user;
  } catch (error) {
    throw error;
  }
};

export const deleteOne = async (userId) => {
  try {
    const user = await User.query().findById(userId);
    if (!user) {
      throw new appError(404, "fail", "No user found with that id");
    }
    await user.$query().delete();
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (userId, oldPassword, newPassword) => {
  try {
    const user = await User.query().findById(userId);
    if (!user) {
      throw new appError(404, "fail", "No user found with that id");
    }

    const isPasswordValid = comparePassword(
      oldPassword,
      user.passwordHash,
      user.passwordSalt
    );

    if (!isPasswordValid) {
      throw new appError(401, "fail", "Invalid old password");
    }

    const isPasswordSame = comparePassword(
      newPassword,
      user.passwordHash,
      user.passwordSalt
    );

    if (isPasswordSame) {
      throw new appError(409, "fail", "New password is the same as old one");
    }

    const [passwordHash, passwordSalt] = hashPassword(newPassword);

    await user.$query().patch({
      passwordHash,
      passwordSalt,
    });
  } catch (error) {
    throw error;
  }
};

// Other methods

export const findAllPosts = async (userId) => {
  try {
    const user = await User.query().findById(userId);
    if (!user) {
      throw new appError(404, "fail", "No user found with that id");
    }
    return user.$relatedQuery("posts");
  } catch (error) {
    throw error;
  }
};

export const findAllComments = async (userId) => {
  try {
    const user = await User.query().findById(userId);
    if (!user) {
      throw new appError(404, "fail", "No user found with that id");
    }
    return user.$relatedQuery("comments");
  } catch (error) {
    throw error;
  }
};
