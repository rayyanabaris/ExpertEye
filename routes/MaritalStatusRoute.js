const router = require("express").Router();

const {
  getMaritalStatusList,
  createMaritalStatus,
  updateMaritalStatus,
  deleteMaritalStatus,
  getMaritalStatusById,
  getSearchMaritalStatus,
} = require("../controllers/MaritalStatusCtrl");

router.get("/", getMaritalStatusList);
router.get("/:id", getMaritalStatusById);
router.post("/add", createMaritalStatus);
router.put("/update/:id", updateMaritalStatus);
router.delete("/delete/:id", deleteMaritalStatus);
router.get("/search/:search", getSearchMaritalStatus);

module.exports = router;
