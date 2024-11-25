const router = require("express").Router();

const {
  getApplyJob,
  createApplyJob,
  updateApplyJob,
  deleteApplyJob,

} = require("../controllers/ApplyJobsCtrl");
const response  = require("../utils/response");

const {
  userMiddleware,
} = require("../middlewares/authMiddleware");

router.get("/job", getApplyJob, response);
router.post("/job", createApplyJob, response);
router.put("/update/:id",userMiddleware, updateApplyJob, response);
router.delete("/delete/:id",userMiddleware, deleteApplyJob, response);

module.exports = router;
