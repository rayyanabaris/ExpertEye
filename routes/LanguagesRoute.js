const router = require("express").Router();

const {
  getLanguageList,
  createLanguage,
  updateLanguage,
  deleteLanguage,
  getLanguageById,
  getSearchLanguage,
} = require("../controllers/LanguagesCtrl");

router.get("/", getLanguageList);
router.get("/:id", getLanguageById);
router.post("/add", createLanguage);
router.put("/update/:id", updateLanguage);
router.delete("/delete/:id", deleteLanguage);
router.get("/search/:search", getSearchLanguage);

module.exports = router;
