const QuizAnswers = require("../models/QuizAnswerModel");
const asyncHandler = require("express-async-handler");

const getQuizAnswerList = asyncHandler(async (req, res) => {
  try {
    const allQuizAnswer = await QuizAnswers.find();
    res.json(allQuizAnswer);
  } catch (error) {
    throw new Error(error);
  }
});

const getQuizAnswerById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaQuizAnswer = await QuizAnswers.findById(id);
    res.json(getaQuizAnswer);
  } catch (error) {
    throw new Error(error);
  }
});

const createQuizAnswer = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const QuizAnswer = await QuizAnswers.create(req.body);
    if(req.file){
      QuizAnswer.image = req.file.path
    }
    res.json(QuizAnswer);
  } catch (error) {
    throw new Error(error);
  }
});
const updateQuizAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedQuizAnswer = await QuizAnswers.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedQuizAnswer);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteQuizAnswer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedQuizAnswer = await QuizAnswers.findByIdAndDelete(id);
    res.json(deletedQuizAnswer);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchQuizAnswer = asyncHandler(async (req, res) => {
  try {
    const getSearchedQuizAnswer = await QuizAnswers.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedQuizAnswer);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getQuizAnswerList,
  getQuizAnswerById,
  getSearchQuizAnswer,
  createQuizAnswer,
  updateQuizAnswer,
  deleteQuizAnswer,
};
