const Languages = require("../models/LanguagesModel");
const asyncHandler = require("express-async-handler");

const getLanguageList = asyncHandler(async (req, res) => {
  try {
    const allLanguage = await Languages.find();
    res.json(allLanguage);
  } catch (error) {
    throw new Error(error);
  }
});

const getLanguageById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaLanguage = await Languages.findById(id);
    res.json(getaLanguage);
  } catch (error) {
    throw new Error(error);
  }
});

const createLanguage = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Language = await Languages.create(req.body);
    res.json(Language);
  } catch (error) {
    throw new Error(error);
  }
});
const updateLanguage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedLanguage = await Languages.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedLanguage);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteLanguage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedLanguage = await Languages.findByIdAndDelete(id);
    res.json(deletedLanguage);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchLanguage = asyncHandler(async (req, res) => {
  try {
    const getSearchedLanguage = await Languages.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedLanguage);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getLanguageList,
  getLanguageById,
  getSearchLanguage,
  createLanguage,
  updateLanguage,
  deleteLanguage,
};
