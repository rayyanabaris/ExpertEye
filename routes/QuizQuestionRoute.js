const router = require("express").Router();

const {
  getQuizQuestionList,
  createQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion,
  getQuizQuestionById,
  getSearchQuizQuestion,
} = require("../controllers/QuizQuestionCtrl");

router.get("/", getQuizQuestionList);
router.get("/:id", getQuizQuestionById);
router.post("/add", createQuizQuestion);
router.put("/update/:id", updateQuizQuestion);
router.delete("/delete/:id", deleteQuizQuestion);
router.get("/search/:search", getSearchQuizQuestion);

module.exports = router;
