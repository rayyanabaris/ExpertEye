const router = require("express").Router();

const {
  getJobTypeList,
  createJobType,
  updateJobType,
  deleteJobType,
  getJobTypeById,
  getSearchJobType,
} = require("../controllers/JobTypeCtrl");

router.get("/", getJobTypeList);
router.get("/:id", getJobTypeById);
router.post("/add", createJobType);
router.put("/update/:id", updateJobType);
router.delete("/delete/:id", deleteJobType);
router.get("/search/:search", getSearchJobType);

module.exports = router;
