const router = require("express").Router();

const {
  getQuizResultList,
  createQuizResult,
  updateQuizResult,
  deleteQuizResult,
  getQuizResultById,
  getSearchQuizResult,
} = require("../controllers/QuizResultCtrl");

router.get("/", getQuizResultList);
router.get("/:id", getQuizResultById);
router.post("/add", createQuizResult);
router.put("/update/:id", updateQuizResult);
router.delete("/delete/:id", deleteQuizResult);
router.get("/search/:search", getSearchQuizResult);

module.exports = router;
