const router = require("express").Router();

const {
  getQuizAnswerList,
  createQuizAnswer,
  updateQuizAnswer,
  deleteQuizAnswer,
  getQuizAnswerById,
  getSearchQuizAnswer,
} = require("../controllers/QuizAnswerCtrl");

router.get("/", getQuizAnswerList);
router.get("/:id", getQuizAnswerById);
router.post("/add", createQuizAnswer);
router.put("/update/:id", updateQuizAnswer);
router.delete("/delete/:id", deleteQuizAnswer);
router.get("/search/:search", getSearchQuizAnswer);

module.exports = router;
