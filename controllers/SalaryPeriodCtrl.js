const SalariesPeriod = require("../models/SalaryPeriodModel");
const asyncHandler = require("express-async-handler");

const getSalaryPeriodList = asyncHandler(async (req, res) => {
  try {
    const allSalaryPeriod = await SalariesPeriod.find();
    res.json(allSalaryPeriod);
  } catch (error) {
    throw new Error(error);
  }
});

const getSalaryPeriodById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaSalaryPeriod = await SalariesPeriod.findById(id);
    res.json(getaSalaryPeriod);
  } catch (error) {
    throw new Error(error);
  }
});

const createSalaryPeriod = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const SalaryPeriod = await SalariesPeriod.create(req.body);
    res.json(SalaryPeriod);
  } catch (error) {
    throw new Error(error);
  }
});
const updateSalaryPeriod = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedSalaryPeriod = await SalariesPeriod.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedSalaryPeriod);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteSalaryPeriod = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedSalaryPeriod = await SalariesPeriod.findByIdAndDelete(id);
    res.json(deletedSalaryPeriod);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchSalaryPeriod = asyncHandler(async (req, res) => {
  try {
    const getSearchedSalaryPeriod = await SalariesPeriod.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedSalaryPeriod);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getSalaryPeriodList,
  getSalaryPeriodById,
  getSearchSalaryPeriod,
  createSalaryPeriod,
  updateSalaryPeriod,
  deleteSalaryPeriod,
};
