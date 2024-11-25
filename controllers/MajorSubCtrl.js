const MajorSubjects = require("../models/MajorSubModel");
const asyncHandler = require("express-async-handler");

const getMajorSubjectList = asyncHandler(async (req, res) => {
  try {
    const allMajorSubject = await MajorSubjects.find();
    res.json(allMajorSubject);
  } catch (error) {
    throw new Error(error);
  }
});

const getMajorSubjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaMajorSubject = await MajorSubjects.findById(id);
    res.json(getaMajorSubject);
  } catch (error) {
    throw new Error(error);
  }
});

const createMajorSubject = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const MajorSubject = await MajorSubjects.create(req.body);
    res.json(MajorSubject);
  } catch (error) {
    throw new Error(error);
  }
});
const updateMajorSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedMajorSubject = await MajorSubjects.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedMajorSubject);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteMajorSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedMajorSubject = await MajorSubjects.findByIdAndDelete(id);
    res.json(deletedMajorSubject);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchMajorSubject = asyncHandler(async (req, res) => {
  try {
    const getSearchedMajorSubject = await MajorSubjects.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedMajorSubject);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getMajorSubjectList,
  getMajorSubjectById,
  getSearchMajorSubject,
  createMajorSubject,
  updateMajorSubject,
  deleteMajorSubject,
};
