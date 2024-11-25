const router = require("express").Router();

const {
  getDegreeTypeList,
  createDegreeType,
  updateDegreeType,
  deleteDegreeType,
  getDegreeTypeById,
  getSearchDegreeType,
} = require("../controllers/DegreeTypeCtrl");

router.get("/", getDegreeTypeList);
router.get("/:id", getDegreeTypeById);
router.post("/add", createDegreeType);
router.put("/update/:id", updateDegreeType);
router.delete("/delete/:id", deleteDegreeType);
router.get("/search/:search", getSearchDegreeType);

module.exports = router;
