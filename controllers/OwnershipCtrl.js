const OwnerShip = require("../models/OwnershipModel");
const asyncHandler = require("express-async-handler");

const getOwnershipList = asyncHandler(async (req, res) => {
  try {
    const allOwnership = await OwnerShip.find();
    res.json(allOwnership);
  } catch (error) {
    throw new Error(error);
  }
});

const getOwnershipById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaOwnership = await OwnerShip.findById(id);
    res.json(getaOwnership);
  } catch (error) {
    throw new Error(error);
  }
});

const createOwnership = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Ownership = await OwnerShip.create(req.body);
    res.json(Ownership);
  } catch (error) {
    throw new Error(error);
  }
});
const updateOwnership = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedOwnership = await OwnerShip.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedOwnership);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteOwnership = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedOwnership = await OwnerShip.findByIdAndDelete(id);
    res.json(deletedOwnership);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchOwnership = asyncHandler(async (req, res) => {
  try {
    const getSearchedOwnership = await OwnerShip.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedOwnership);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getOwnershipList,
  getOwnershipById,
  getSearchOwnership,
  createOwnership,
  updateOwnership,
  deleteOwnership,
};
