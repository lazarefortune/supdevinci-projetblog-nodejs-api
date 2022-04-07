import {
  createOne,
  findOneById,
  findAll,
  updateOneWithPatch,
  deleteOne,
} from "../services/role.service.js";

import AppError from "../utils/appError.js";

export const getAllRoles = async (req, res, next) => {
  try {
    const roles = await findAll(req.query);
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

export const createRole = async (req, res, next) => {
  const { name, orderPriority } = req.body;

  const datas = { name, orderPriority: Number(orderPriority) };

  try {
    if (!name || !orderPriority) {
      throw new AppError(400, "fail", "Missing role data");
    }

    const role = await createOne(datas);
    res.status(201).json(role);
  } catch (error) {
    next(error);
  }
};

export const getRole = async (req, res, next) => {
  try {
    const roleId = req.params.id;

    if (!roleId || !Number(roleId)) {
      throw new AppError(404, "fail", "Missing role id");
    }

    const role = await findOneById(roleId);

    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

export const updatedRole = async (req, res, next) => {
  const { name, orderPriority } = req.body;

  const datas = { name, orderPriority };

  try {
    const roleId = req.params.id;

    if (!roleId || !Number(roleId)) {
      throw new AppError(404, "fail", "Missing role id");
    }

    const role = await updateOneWithPatch(roleId, datas);

    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (req, res, next) => {
  try {
    const roleId = req.params.id;

    if (!roleId || !Number(roleId)) {
      throw new AppError(404, "fail", "Missing role id");
    }

    await deleteOne(roleId);

    res.status(200).send({
      status: "success",
      statusCode: 200,
      message: "Role deleted",
    });
  } catch (error) {
    next(error);
  }
};
