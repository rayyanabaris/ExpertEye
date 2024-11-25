const JobsShift = require("../models/JobShiftModel");
const asyncHandler = require("express-async-handler");

const getJobShiftList = asyncHandler(async (req, res) => {
  try {
    const allJobShift = await JobsShift.find();
    res.json(allJobShift);
  } catch (error) {
    throw new Error(error);
  }
});

const getJobShiftById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaJobShift = await JobsShift.findById(id);
    res.json(getaJobShift);
  } catch (error) {
    throw new Error(error);
  }
});

const createJobShift = asyncHandler(async (req, res) => {
  try {

    const JobShift = await JobsShift.create(req.body);
    res.json(JobShift);
  } catch (error) {
    throw new Error(error);
  }
});
const updateJobShift = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedJobShift = await JobsShift.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedJobShift);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteJobShift = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedJobShift = await JobsShift.findByIdAndDelete(id);
    res.json(deletedJobShift);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchJobShift = asyncHandler(async (req, res) => {
  try {
    const getSearchedJobShift = await JobsShift.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedJobShift);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getJobShiftList,
  getJobShiftById,
  getSearchJobShift,
  createJobShift,
  updateJobShift,
  deleteJobShift,
};
