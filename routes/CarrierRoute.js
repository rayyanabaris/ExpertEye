const router = require("express").Router();

const {
  getCarrierList,
  createCarrier,
  updateCarrier,
  deleteCarrier,
  getCarrierById,
  getSearchCarrier,
} = require("../controllers/CarrierCtrl");

router.get("/", getCarrierList);
router.get("/:id", getCarrierById);
router.post("/add", createCarrier);
router.put("/update/:id", updateCarrier);
router.delete("/delete/:id", deleteCarrier);
router.get("/search/:search", getSearchCarrier);

module.exports = router;
