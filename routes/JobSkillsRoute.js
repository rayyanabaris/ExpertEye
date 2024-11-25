const router = require("express").Router();

const {
  getSkillsList,
  createSkills,
  updateSkills,
  deleteSkills,
  getSkillsById,
  getSearchSkills,
} = require("../controllers/JobSkillsCtrl");

router.get("/", getSkillsList);
router.get("/:id", getSkillsById);
router.post("/add", createSkills);
router.put("/update/:id", updateSkills);
router.delete("/delete/:id", deleteSkills);
router.get("/search/:search", getSearchSkills);

module.exports = router;
