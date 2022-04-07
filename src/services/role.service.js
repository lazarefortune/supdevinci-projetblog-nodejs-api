import Role from "../db/models/role.model.js";

import APIFeatures from "../utils/apiFeatures.js";
import appError from "../utils/appError.js";

const findOneByNameAndOrder = async (name, orderPriority) => {
  // TODO: Refactor
  let role = null;
  if (name) {
    role = await Role.query().findOne({ name });
  }
  if (!role) {
    if (orderPriority) {
      role = await Role.query().findOne({ orderPriority });
    }
  }
  return role;
};

export const findAll = async (queryString) => {
  try {
    const features = new APIFeatures(Role.query(), queryString)
      .limit()
      .sort()
      .paginate();

    const role = await features.query;
    return role;
  } catch (error) {
    throw error;
  }
};

export const createOne = async (datas) => {
  try {
    const roleExist = await findOneByNameAndOrder(
      datas.name,
      datas.orderPriority
    );

    if (roleExist) {
      throw new appError(409, "fail", "Role already exist");
    }

    return Role.query().insert(datas);
  } catch (error) {
    throw error;
  }
};

export const findOneById = async (roleId) => {
  try {
    const role = await Role.query().findById(roleId);
    if (!role) {
      throw new appError(404, "fail", "No Role found with that id");
    }
    return role;
  } catch (error) {
    throw error;
  }
};

export const updateOneWithPatch = async (roleId, datas) => {
  try {
    const roleMatchWithId = await Role.query().findById(roleId);
    if (!roleMatchWithId) {
      throw new appError(404, "fail", "No role found with that id");
    }

    if (datas.name || datas.orderPriority) {
      const roleMatch = await findOneByNameAndOrder(
        datas.name,
        datas.orderPriority
      );

      if (roleMatch && roleMatch.id !== roleMatchWithId.id) {
        throw new appError(409, "fail", "role parameters already exist");
      }
    }

    const role = await Role.query().patchAndFetchById(roleId, datas);
    return role;
  } catch (error) {
    throw error;
  }
};

export const deleteOne = async (roleId) => {
  try {
    const role = await Role.query().findById(roleId);
    if (!role) {
      throw new appError(404, "fail", "No role found with that id");
    }
    await role.$query().delete();
  } catch (error) {
    throw error;
  }
};
