const Genders = require("../models/GenderModel");
const asyncHandler = require("express-async-handler");

const getGenderList = asyncHandler(async (req, res) => {
  try {
    const allGender = await Genders.find();
    res.json(allGender);
  } catch (error) {
    throw new Error(error);
  }
});

const getGenderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaGender = await Genders.findById(id);
    res.json(getaGender);
  } catch (error) {
    throw new Error(error);
  }
});

const createGender = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Gender = await Genders.create(req.body);
    res.json(Gender);
  } catch (error) {
    throw new Error(error);
  }
});
const updateGender = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedGender = await Genders.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedGender);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteGender = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedGender = await Genders.findByIdAndDelete(id);
    res.json(deletedGender);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchGender = asyncHandler(async (req, res) => {
  try {
    const getSearchedGender = await Genders.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedGender);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getGenderList,
  getGenderById,
  getSearchGender,
  createGender,
  updateGender,
  deleteGender,
};
