const router = require("express").Router();

const {
  getCountriesList,
  createCountries,
  updateCountries,
  deleteCountries,
  getCountriesById,
  getSearchCountries,
} = require("../controllers/CountriesCtrl");

router.get("/", getCountriesList);
router.get("/:id", getCountriesById);
router.post("/add", createCountries);
router.put("/update/:id", updateCountries);
router.delete("/delete/:id", deleteCountries);
router.get("/search/:search", getSearchCountries);

module.exports = router;
