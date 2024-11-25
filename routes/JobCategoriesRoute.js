const router = require("express").Router();

const {
  getJobCategoryList,
  createJobCategory,
  getAllJobCategory,
  updateJobCategory,
  deleteJobCategory,
  getFilterCategory,
  getJobCategoryById,
  getSearchJobCategory,
} = require("../controller/JobCategoriesCtrl");

router.get("/all", getJobCategoryList);
router.get("/all-category", getAllJobCategory);
router.get("/get/:id", getJobCategoryById);
router.get("/filter", getFilterCategory);
router.post("/add", createJobCategory);
router.put("/update/:id", updateJobCategory);
router.delete("/delete/:id", deleteJobCategory);
router.get("/search/:key", getSearchJobCategory);

module.exports = router;
