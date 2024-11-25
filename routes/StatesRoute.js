const router = require("express").Router();

const {
  getStatesList,
  createStates,
  updateStates,
  deleteStates,
  getStatesById,
  getSearchStates,
} = require("../controllers/StatesCtrl");

router.get("/", getStatesList);
router.get("/:id", getStatesById);
router.post("/add", createStates);
router.put("/update/:id", updateStates);
router.delete("/delete/:id", deleteStates);
router.get("/search/:search", getSearchStates);

module.exports = router;
