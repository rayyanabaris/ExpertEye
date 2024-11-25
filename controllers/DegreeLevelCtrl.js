const DegreeLevels = require("../models/DegreeLevelModel");
const asyncHandler = require("express-async-handler");

const getDegreeLevelList = asyncHandler(async (req, res) => {
  try {
    const allDegreeLevel = await DegreeLevels.find();
    res.json(allDegreeLevel);
  } catch (error) {
    throw new Error(error);
  }
});

const getDegreeLevelById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaDegreeLevel = await DegreeLevels.findById(id);
    res.json(getaDegreeLevel);
  } catch (error) {
    throw new Error(error);
  }
});

const createDegreeLevel = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const DegreeLevel = await DegreeLevels.create(req.body);
    res.json(DegreeLevel);
  } catch (error) {
    throw new Error(error);
  }
});
const updateDegreeLevel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedDegreeLevel = await DegreeLevels.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedDegreeLevel);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteDegreeLevel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedDegreeLevel = await DegreeLevels.findByIdAndDelete(id);
    res.json(deletedDegreeLevel);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchDegreeLevel = asyncHandler(async (req, res) => {
  try {
    const getSearchedDegreeLevel = await DegreeLevels.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedDegreeLevel);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getDegreeLevelList,
  getDegreeLevelById,
  getSearchDegreeLevel,
  createDegreeLevel,
  updateDegreeLevel,
  deleteDegreeLevel,
};
