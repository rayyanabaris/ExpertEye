const Country = require("../models/CountriesModel");
const asyncHandler = require("express-async-handler");

const getCountriesList = asyncHandler(async (req, res) => {
  try {
    const allCountries = await Country.find();
    res.json(allCountries);
  } catch (error) {
    throw new Error(error);
  }
});

const getCountriesById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaCountries = await Country.findById(id);
    res.json(getaCountries);
  } catch (error) {
    throw new Error(error);
  }
});

const createCountries = asyncHandler(async (req, res) => {
  try {
  
    const Countries = await Country.create(req.body);
    res.json(Countries);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCountries = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedCountries = await Country.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCountries);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCountries = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedCountries = await Country.findByIdAndDelete(id);
    res.json(deletedCountries);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchCountries = asyncHandler(async (req, res) => {
  try {
    const getSearchedCountries = await Country.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedCountries);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getCountriesList,
  getCountriesById,
  getSearchCountries,
  createCountries,
  updateCountries,
  deleteCountries,
};
