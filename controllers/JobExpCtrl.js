const JobsExp = require("../models/JobExpModel");
const asyncHandler = require("express-async-handler");

const getJobExpList = asyncHandler(async (req, res) => {
  try {
    const allJobExp = await JobsExp.find();
    res.json(allJobExp);
  } catch (error) {
    throw new Error(error);
  }
});

const getJobExpById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaJobExp = await JobsExp.findById(id);
    res.json(getaJobExp);
  } catch (error) {
    throw new Error(error);
  }
});

const createJobExp = asyncHandler(async (req, res) => {
  try {
    const JobExp = await JobsExp.create(req.body);
    res.json(JobExp);
  } catch (error) {
    throw new Error(error);
  }
});
const updateJobExp = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedJobExp = await JobsExp.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedJobExp);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteJobExp = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedJobExp = await JobsExp.findByIdAndDelete(id);
    res.json(deletedJobExp);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchJobExp = asyncHandler(async (req, res) => {
  try {
    const getSearchedJobExp = await JobsExp.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedJobExp);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getJobExpList,
  getJobExpById,
  getSearchJobExp,
  createJobExp,
  updateJobExp,
  deleteJobExp,
};
