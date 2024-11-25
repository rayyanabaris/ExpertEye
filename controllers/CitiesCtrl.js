const City = require("../models/CitiesModel");
const asyncHandler = require("express-async-handler");

const getCitiesList = asyncHandler(async (req, res) => {
  try {
    const allCities = await City.find()
    .populate("state_id")
    .exec();
    res.json(allCities);
  } catch (error) {
    throw new Error(error);
  }
});

const getCitiesById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaCities = await City.findById(id)
    .populate("state_id")
    .exec();
    res.json(getaCities);
  } catch (error) {
    throw new Error(error);
  }
});

const createCities = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Cities = await City.create(req.body);
    res.json(Cities);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCities = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedCities = await City.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCities);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCities = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedCities = await City.findByIdAndDelete(id);
    res.json(deletedCities);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchCities = asyncHandler(async (req, res) => {
  try {
    const getSearchedCities = await City.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedCities);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getCitiesList,
  getCitiesById,
  getSearchCities,
  createCities,
  updateCities,
  deleteCities,
};
