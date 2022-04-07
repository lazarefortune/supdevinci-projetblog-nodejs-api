import User from "../db/models/user.model.js";

import APIFeatures from "../utils/apiFeatures.js";
import appError from "../utils/appError.js";

const findOneByEmail = async (email) => {
  const user = await User.query().findOne({ email });
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

export const createOne = async (datas) => {
  try {
    const userExist = await findOneByEmail(datas.email);

    if (userExist) {
      throw new appError(409, "fail", "User already exist");
    }
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
    const oldUser = await User.query().findById(userId);
    if (!oldUser) {
      throw new appError(404, "fail", "No user found with that id");
    }

    if (datas.email) {
      const userExist = await findOneByEmail(datas.email);

      if (userExist && userExist.id !== Number(userId)) {
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
