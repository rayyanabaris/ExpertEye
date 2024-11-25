const QuizResults = require("../models/QuizResultModel");
const asyncHandler = require("express-async-handler");

const getQuizResultList = asyncHandler(async (req, res) => {
  try {
    const allQuizResult = await QuizResults.find();
    res.json(allQuizResult);
  } catch (error) {
    throw new Error(error);
  }
});

const getQuizResultById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaQuizResult = await QuizResults.findById(id);
    res.json(getaQuizResult);
  } catch (error) {
    throw new Error(error);
  }
});

const createQuizResult = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const QuizResult = await QuizResults.create(req.body);
    if(req.file){
      QuizResult.image = req.file.path
    }
    res.json(QuizResult);
  } catch (error) {
    throw new Error(error);
  }
});
const updateQuizResult = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedQuizResult = await QuizResults.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedQuizResult);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteQuizResult = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedQuizResult = await QuizResults.findByIdAndDelete(id);
    res.json(deletedQuizResult);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchQuizResult = asyncHandler(async (req, res) => {
  try {
    const getSearchedQuizResult = await QuizResults.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedQuizResult);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getQuizResultList,
  getQuizResultById,
  getSearchQuizResult,
  createQuizResult,
  updateQuizResult,
  deleteQuizResult,
};
