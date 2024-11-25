const router = require("express").Router();

const {
  getIndustryList,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  getIndustryById,
  getSearchIndustry,
} = require("../controllers/IndustriesCtrl");

router.get("/", getIndustryList);
router.get("/:id", getIndustryById);
router.post("/add", createIndustry);
router.put("/update/:id", updateIndustry);
router.delete("/delete/:id", deleteIndustry);
router.get("/search/:search", getSearchIndustry);

module.exports = router;
