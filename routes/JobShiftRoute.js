const router = require("express").Router();

const {
  getJobShiftList,
  createJobShift,
  updateJobShift,
  deleteJobShift,
  getJobShiftById,
  getSearchJobShift,
} = require("../controllers/JobShiftCtrl");

router.get("/", getJobShiftList);
router.get("/:id", getJobShiftById);
router.post("/add", createJobShift);
router.put("/update/:id", updateJobShift);
router.delete("/delete/:id", deleteJobShift);
router.get("/search/:search", getSearchJobShift);

module.exports = router;
