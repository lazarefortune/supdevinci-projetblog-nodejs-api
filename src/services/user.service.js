import jsonwebtoken from "jsonwebtoken";
import config from "../config/config.js";
import User from "../db/models/user.model.js";

import APIFeatures from "../utils/apiFeatures.js";
import appError from "../utils/appError.js";

import {
  hashPassword,
  comparePassword,
} from "../security/password/password.js";

import { securityHelper } from "../utils/tools.js";

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
    if (!securityHelper.emailRegex.test(email)) {
      throw new appError(400, "fail", "Invalid email format");
    }

    if (password.length < securityHelper.passwordLengthMin) {
      throw new appError(
        400,
        "fail",
        `Password must be at least ${securityHelper.passwordLengthMin} characters`
      );
    }

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
      {
        payload: {
          user: { id: user.id, role: user.role },
        },
      },
      config.security.session.secret,
      { expiresIn: config.security.session.expireAfter }
    );

    return [user, token];
  } catch (error) {
    throw error;
  }
};

export const createOne = async (user) => {
  try {
    if (!securityHelper.emailRegex.test(user.email)) {
      throw new appError(400, "fail", "Invalid email format");
    }

    const isUserExist = await findOneByField("email", user.email);

    if (isUserExist) {
      throw new appError(409, "fail", "Email already exist");
    }

    if (!securityHelper.passwordRegex.test(user.password)) {
      throw new appError(400, "fail", securityHelper.passwordError);
    }

    const [passwordHash, passwordSalt] = hashPassword(user.password);

    user.passwordHash = passwordHash;
    user.passwordSalt = passwordSalt;

    delete user.password;

    return User.query().insert(user);
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

export const updateOneWithPatch = async (userId, user) => {
  try {
    const isUserExist = await User.query().findById(userId);
    if (!isUserExist) {
      throw new appError(404, "fail", "No user found with that id");
    }

    if (user.email) {
      if (!securityHelper.emailRegex.test(user.email)) {
        throw new appError(400, "fail", "Invalid email format");
      }

      const userWithSameEmail = await findOneByField("email", user.email);

      if (userWithSameEmail && userWithSameEmail.id !== Number(userId)) {
        throw new appError(409, "fail", "Email already exist");
      }
    }

    const newUser = await User.query().patchAndFetchById(userId, user);
    return newUser;
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

    if (!securityHelper.passwordRegex.test(newPassword)) {
      throw new appError(400, "fail", securityHelper.passwordError);
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
