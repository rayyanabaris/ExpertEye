const Carriers = require("../models/CarrierModel");
const asyncHandler = require("express-async-handler");

const getCarrierList = asyncHandler(async (req, res) => {
  try {
    const allCarrier = await Carriers.find();
    res.json(allCarrier);
  } catch (error) {
    throw new Error(error);
  }
});

const getCarrierById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaCarrier = await Carriers.findById(id);
    res.json(getaCarrier);
  } catch (error) {
    throw new Error(error);
  }
});

const createCarrier = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Carrier = await Carriers.create(req.body);
    res.json(Carrier);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCarrier = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedCarrier = await Carriers.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCarrier);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCarrier = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedCarrier = await Carriers.findByIdAndDelete(id);
    res.json(deletedCarrier);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchCarrier = asyncHandler(async (req, res) => {
  try {
    const getSearchedCarrier = await Carriers.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedCarrier);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getCarrierList,
  getCarrierById,
  getSearchCarrier,
  createCarrier,
  updateCarrier,
  deleteCarrier,
};
