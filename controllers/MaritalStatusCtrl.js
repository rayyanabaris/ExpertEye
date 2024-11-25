const MaritalStatuses = require("../models/MaritalStatusRoute");
const asyncHandler = require("express-async-handler");

const getMaritalStatusList = asyncHandler(async (req, res) => {
  try {
    const allMaritalStatus = await MaritalStatuses.find();
    res.json(allMaritalStatus);
  } catch (error) {
    throw new Error(error);
  }
});

const getMaritalStatusById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaMaritalStatus = await MaritalStatuses.findById(id);
    res.json(getaMaritalStatus);
  } catch (error) {
    throw new Error(error);
  }
});

const createMaritalStatus = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const MaritalStatus = await MaritalStatuses.create(req.body);
    res.json(MaritalStatus);
  } catch (error) {
    throw new Error(error);
  }
});
const updateMaritalStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedMaritalStatus = await MaritalStatuses.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedMaritalStatus);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteMaritalStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedMaritalStatus = await MaritalStatuses.findByIdAndDelete(id);
    res.json(deletedMaritalStatus);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchMaritalStatus = asyncHandler(async (req, res) => {
  try {
    const getSearchedMaritalStatus = await MaritalStatuses.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedMaritalStatus);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getMaritalStatusList,
  getMaritalStatusById,
  getSearchMaritalStatus,
  createMaritalStatus,
  updateMaritalStatus,
  deleteMaritalStatus,
};
