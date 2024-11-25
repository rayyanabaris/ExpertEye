const Skill = require("../models/JobSkillsModel");
const asyncHandler = require("express-async-handler");

const getSkillsList = asyncHandler(async (req, res) => {
  try {
    const allSkills = await Skill.find();
    res.json(allSkills);
  } catch (error) {
    throw new Error(error);
  }
});

const getSkillsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaSkills = await Skill.findById(id);
    res.json(getaSkills);
  } catch (error) {
    throw new Error(error);
  }
});

const createSkills = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Skills = await Skill.create(req.body);
    res.json(Skills);
  } catch (error) {
    throw new Error(error);
  }
});
const updateSkills = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedSkills = await Skill.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedSkills);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteSkills = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedSkills = await Skill.findByIdAndDelete(id);
    res.json(deletedSkills);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchSkills = asyncHandler(async (req, res) => {
  try {
    const getSearchedSkills = await Skills.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedSkills);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getSkillsList,
  getSkillsById,
  getSearchSkills,
  createSkills,
  updateSkills,
  deleteSkills,
};
