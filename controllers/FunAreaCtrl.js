const FunctionalArea = require("../models/FunAreaModel");
const asyncHandler = require("express-async-handler");

const getFunAreasList = asyncHandler(async (req, res) => {
  try {
    const allFunAreas = await FunctionalArea.find();
    res.json(allFunAreas);
  } catch (error) {
    throw new Error(error);
  }
});

const getFunAreasById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaFunAreas = await FunctionalArea.findById(id);
    res.json(getaFunAreas);
  } catch (error) {
    throw new Error(error);
  }
});

const createFunAreas = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const FunAreas = await FunctionalArea.create(req.body);
    res.json(FunAreas);
  } catch (error) {
    throw new Error(error);
  }
});
const updateFunAreas = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedFunAreas = await FunctionalArea.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedFunAreas);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteFunAreas = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedFunAreas = await FunctionalArea.findByIdAndDelete(id);
    res.json(deletedFunAreas);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchFunAreas = asyncHandler(async (req, res) => {
  try {
    const getSearchedFunAreas = await FunctionalArea.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedFunAreas);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getFunAreasList,
  getFunAreasById,
  getSearchFunAreas,
  createFunAreas,
  updateFunAreas,
  deleteFunAreas,
};
