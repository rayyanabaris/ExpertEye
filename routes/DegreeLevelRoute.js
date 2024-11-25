const router = require("express").Router();

const {
  getDegreeLevelList,
  createDegreeLevel,
  updateDegreeLevel,
  deleteDegreeLevel,
  getDegreeLevelById,
  getSearchDegreeLevel,
} = require("../controllers/DegreeLevelCtrl");

router.get("/", getDegreeLevelList);
router.get("/:id", getDegreeLevelById);
router.post("/add", createDegreeLevel);
router.put("/update/:id", updateDegreeLevel);
router.delete("/delete/:id", deleteDegreeLevel);
router.get("/search/:search", getSearchDegreeLevel);

module.exports = router;
