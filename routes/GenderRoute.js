const router = require("express").Router();

const {
  getGenderList,
  createGender,
  updateGender,
  deleteGender,
  getGenderById,
  getSearchGender,
} = require("../controllers/GenderCtrl");

router.get("/", getGenderList);
router.get("/:id", getGenderById);
router.post("/add", createGender);
router.put("/update/:id", updateGender);
router.delete("/delete/:id", deleteGender);
router.get("/search/:search", getSearchGender);

module.exports = router;
