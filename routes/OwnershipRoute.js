const router = require("express").Router();

const {
  getOwnershipList,
  createOwnership,
  updateOwnership,
  deleteOwnership,
  getOwnershipById,
  getSearchOwnership,
} = require("../controllers/OwnershipCtrl");

router.get("/", getOwnershipList);
router.get("/:id", getOwnershipById);
router.post("/add", createOwnership);
router.put("/update/:id", updateOwnership);
router.delete("/delete/:id", deleteOwnership);
router.get("/search/:search", getSearchOwnership);

module.exports = router;
