const JobsType = require("../models/JobTypeModel");
const asyncHandler = require("express-async-handler");

const getJobTypeList = asyncHandler(async (req, res) => {
  try {
    const allJobType = await JobsType.find();
    res.json(allJobType);
  } catch (error) {
    throw new Error(error);
  }
});

const getJobTypeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaJobType = await JobsType.findById(id);
    res.json(getaJobType);
  } catch (error) {
    throw new Error(error);
  }
});

const createJobType = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const JobType = await JobsType.create(req.body);
    res.json(JobType);
  } catch (error) {
    throw new Error(error);
  }
});
const updateJobType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedJobType = await JobsType.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedJobType);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteJobType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedJobType = await JobsType.findByIdAndDelete(id);
    res.json(deletedJobType);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchJobType = asyncHandler(async (req, res) => {
  try {
    const getSearchedJobType = await JobsType.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedJobType);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getJobTypeList,
  getJobTypeById,
  getSearchJobType,
  createJobType,
  updateJobType,
  deleteJobType,
};
