const router = require("express").Router();

const {
  getJobExpList,
  createJobExp,
  updateJobExp,
  deleteJobExp,
  getJobExpById,
  getSearchJobExp,
} = require("../controllers/JobExpCtrl");

router.get("/", getJobExpList);
router.get("/:id", getJobExpById);
router.post("/add", createJobExp);
router.put("/update/:id", updateJobExp);
router.delete("/delete/:id", deleteJobExp);
router.get("/search/:search", getSearchJobExp);

module.exports = router;
