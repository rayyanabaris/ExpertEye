const State = require("../models/StatesModel");
const asyncHandler = require("express-async-handler");

const getStatesList = asyncHandler(async (req, res) => {
  try {
    const allStates = await State.find()
    .populate("country_id")
    .exec();
    res.json(allStates);
  } catch (error) {
    throw new Error(error);
  }
});

const getStatesById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaStates = await State.findById(id)
    .populate("country_id")
    .exec();
    res.json(getaStates);
  } catch (error) {
    throw new Error(error);
  }
});

const createStates = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const States = await State.create(req.body);
    res.json(States);
  } catch (error) {
    throw new Error(error);
  }
});
const updateStates = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedStates = await State.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedStates);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteStates = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedStates = await State.findByIdAndDelete(id);
    res.json(deletedStates);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchStates = asyncHandler(async (req, res) => {
  try {
    const getSearchedStates = await State.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedStates);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getStatesList,
  getStatesById,
  getSearchStates,
  createStates,
  updateStates,
  deleteStates,
};
