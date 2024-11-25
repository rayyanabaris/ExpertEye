const router = require("express").Router();

const {
  getCitiesList,
  createCities,
  updateCities,
  deleteCities,
  getCitiesById,
  getSearchCities,
} = require("../controllers/CitiesCtrl");

router.get("/", getCitiesList);
router.get("/:id", getCitiesById);
router.post("/add", createCities);
router.put("/update/:id", updateCities);
router.delete("/delete/:id", deleteCities);
router.get("/search/:search", getSearchCities);

module.exports = router;
