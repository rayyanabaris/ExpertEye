const DegreeTypes = require("../models/DegreeTypeModel");
const asyncHandler = require("express-async-handler");

const getDegreeTypeList = asyncHandler(async (req, res) => {
  try {
    const allDegreeType = await DegreeTypes.find();
    res.json(allDegreeType);
  } catch (error) {
    throw new Error(error);
  }
});

const getDegreeTypeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaDegreeType = await DegreeTypes.findById(id);
    res.json(getaDegreeType);
  } catch (error) {
    throw new Error(error);
  }
});

const createDegreeType = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const DegreeType = await DegreeTypes.create(req.body);
    res.json(DegreeType);
  } catch (error) {
    throw new Error(error);
  }
});
const updateDegreeType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedDegreeType = await DegreeTypes.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedDegreeType);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteDegreeType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedDegreeType = await DegreeTypes.findByIdAndDelete(id);
    res.json(deletedDegreeType);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchDegreeType = asyncHandler(async (req, res) => {
  try {
    const getSearchedDegreeType = await DegreeTypes.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedDegreeType);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getDegreeTypeList,
  getDegreeTypeById,
  getSearchDegreeType,
  createDegreeType,
  updateDegreeType,
  deleteDegreeType,
};
