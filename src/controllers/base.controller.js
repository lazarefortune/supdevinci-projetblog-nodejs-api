/*
 * This part of code can be used to create a base controller for all controllers
 */

import APIFeatures from "../utils/apiFeatures.js"
import AppError from "../utils/appError.js"

export const getAll = (Model) => async (req, res, next) => {
  try {
    const features = new APIFeatures(Model.query(), req.query)
      .limit()
      .sort()
      .paginate()

    const doc = await features.query

    res.status(200).json(doc)
  } catch (error) {
    next(error)
  }
}

export const getOne = (Model) => async (req, res, next) => {
  const elementId = req.params.id

  if (!elementId || !Number(elementId)) {
    return res.status(400).json({
      status: "fail",
      statusCode: 400,
      message: "Missing id",
    })
  }

  try {
    const ressource = await Model.query().findById(elementId)
    if (!ressource) {
      throw new AppError(404, "fail", "No ressource found with that id")
    }
    res.status(200).json(ressource)
  } catch (error) {
    next(error)
  }
}

export const createOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.query().insert(req.body)
    res.status(201).json(doc)
  } catch (error) {
    next(error)
  }
}
