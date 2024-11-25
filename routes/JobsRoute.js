const router = require("express").Router();

const {
  getJobList,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  FilterJobs,
} = require("../controllers/JobsCtrl");
const {
  adminMiddleware,
} = require("../middlewares/authMiddleware");

const response  = require("../utils/response");

router.get("/allJobs", adminMiddleware, getJobList, response);
router.get("/getId/:id", adminMiddleware, getJobById, response);
router.get("/search", adminMiddleware, FilterJobs, response);
router.post("/addJobs", adminMiddleware, createJob, response);
router.put("/updateJob/:id", adminMiddleware,  updateJob, response);
router.delete("/deleteJob/:id", adminMiddleware,  deleteJob, response);

module.exports = router;
