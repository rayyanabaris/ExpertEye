const ResultTypes = require("../models/ResultTypeModel");
const asyncHandler = require("express-async-handler");

const getResultTypeList = asyncHandler(async (req, res) => {
  try {
    const allResultType = await ResultTypes.find();
    res.json(allResultType);
  } catch (error) {
    throw new Error(error);
  }
});

const getResultTypeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaResultType = await ResultTypes.findById(id);
    res.json(getaResultType);
  } catch (error) {
    throw new Error(error);
  }
});

const createResultType = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const ResultType = await ResultTypes.create(req.body);
    res.json(ResultType);
  } catch (error) {
    throw new Error(error);
  }
});
const updateResultType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedResultType = await ResultTypes.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedResultType);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteResultType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedResultType = await ResultTypes.findByIdAndDelete(id);
    res.json(deletedResultType);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchResultType = asyncHandler(async (req, res) => {
  try {
    const getSearchedResultType = await ResultTypes.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedResultType);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getResultTypeList,
  getResultTypeById,
  getSearchResultType,
  createResultType,
  updateResultType,
  deleteResultType,
};
