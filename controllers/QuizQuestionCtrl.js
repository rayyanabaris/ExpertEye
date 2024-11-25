const QuizQuestions = require("../models/QuizQuestionModel");
const asyncHandler = require("express-async-handler");

const getQuizQuestionList = asyncHandler(async (req, res) => {
  try {
    const allQuizQuestion = await QuizQuestions.find();
    res.json(allQuizQuestion);
  } catch (error) {
    throw new Error(error);
  }
});

const getQuizQuestionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaQuizQuestion = await QuizQuestions.findById(id);
    res.json(getaQuizQuestion);
  } catch (error) {
    throw new Error(error);
  }
});

const createQuizQuestion = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const QuizQuestion = await QuizQuestions.create(req.body);
    if(req.file){
      QuizQuestion.image = req.file.path
    }
    res.json(QuizQuestion);
  } catch (error) {
    throw new Error(error);
  }
});
const updateQuizQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedQuizQuestion = await QuizQuestions.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedQuizQuestion);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteQuizQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedQuizQuestion = await QuizQuestions.findByIdAndDelete(id);
    res.json(deletedQuizQuestion);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchQuizQuestion = asyncHandler(async (req, res) => {
  try {
    const getSearchedQuizQuestion = await QuizQuestions.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedQuizQuestion);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getQuizQuestionList,
  getQuizQuestionById,
  getSearchQuizQuestion,
  createQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion,
};
