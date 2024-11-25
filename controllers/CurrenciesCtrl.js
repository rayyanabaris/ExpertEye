const Currency = require("../models/CurrenciesModel");
const asyncHandler = require("express-async-handler");

const getCurrenciesList = asyncHandler(async (req, res) => {
  try {
    const allCurrencies = await Currency.find();
    res.json(allCurrencies);
  } catch (error) {
    throw new Error(error);
  }
});

const getCurrenciesById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaCurrencies = await Currency.findById(id);
    res.json(getaCurrencies);
  } catch (error) {
    throw new Error(error);
  }
});

const createCurrencies = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Currencies = await Currency.create(req.body);
    res.json(Currencies);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCurrencies = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedCurrencies = await Currency.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCurrencies);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCurrencies = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedCurrencies = await Currency.findByIdAndDelete(id);
    res.json(deletedCurrencies);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchCurrencies = asyncHandler(async (req, res) => {
  try {
    const getSearchedCurrencies = await Currency.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedCurrencies);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getCurrenciesList,
  getCurrenciesById,
  getSearchCurrencies,
  createCurrencies,
  updateCurrencies,
  deleteCurrencies,
};
