const Industries = require("../models/IndustriesModel");
const asyncHandler = require("express-async-handler");

const getIndustryList = asyncHandler(async (req, res) => {
  try {
    const allIndustry = await Industries.find();
    res.json(allIndustry);
  } catch (error) {
    throw new Error(error);
  }
});

const getIndustryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaIndustry = await Industries.findById(id);
    res.json(getaIndustry);
  } catch (error) {
    throw new Error(error);
  }
});

const createIndustry = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Industry = await Industries.create(req.body);
    res.json(Industry);
  } catch (error) {
    throw new Error(error);
  }
});
const updateIndustry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedIndustry = await Industries.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedIndustry);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteIndustry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedIndustry = await Industries.findByIdAndDelete(id);
    res.json(deletedIndustry);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchIndustry = asyncHandler(async (req, res) => {
  try {
    const getSearchedIndustry = await Industries.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedIndustry);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getIndustryList,
  getIndustryById,
  getSearchIndustry,
  createIndustry,
  updateIndustry,
  deleteIndustry,
};
