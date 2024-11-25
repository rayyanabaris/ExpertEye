const router = require("express").Router();

const {
  getFunAreasList,
  createFunAreas,
  updateFunAreas,
  deleteFunAreas,
  getFunAreasById,
  getSearchFunAreas,
} = require("../controllers/FunAreaCtrl");

router.get("/", getFunAreasList);
router.get("/:id", getFunAreasById);
router.post("/add", createFunAreas);
router.put("/update/:id", updateFunAreas);
router.delete("/delete/:id", deleteFunAreas);
router.get("/search/:search", getSearchFunAreas);

module.exports = router;
