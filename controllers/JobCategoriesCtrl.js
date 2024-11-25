const Categories = require("../models/JobCategoriesModel");
const asyncHandler = require("express-async-handler");

const getJobCategoryList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalCategory = await Categories.countDocuments();
      const totalPages = Math.ceil(totalCategory / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allJobCategory = await Categories.find().skip((page - 1) * limit).limit(limit)
    .sort("category_name : 1");
    
    return res.status(200).json({
      success: true,
      msg: 'Categories',
      data: allJobCategory,
      page,
      nextPage,
      totalPages,
      totalCategory
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getJobCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaJobCategory = await Categories.findById(id);
    res.json(getaJobCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getFilterCategory = asyncHandler(async (req, res) => {
  try {
    const allJobCategory = await Categories
      .find(req.query)
      .exec();
    res.json(allJobCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllJobCategory = asyncHandler(async (req, res) => {
  try {
    const allJobCategory = await Categories.find()
     .sort("category_name : 1");
    res.json(allJobCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const createJobCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const JobCategory = await Categories.create(req.body);
    res.json(JobCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const updateJobCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedJobCategory = await Categories.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedJobCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteJobCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedJobCategory = await Categories.findByIdAndDelete(id);
    res.json(deletedJobCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchJobCategory = asyncHandler(async (req, res) => {
  try {
    const getSearchedJobCategory = await Categories.find({

      "$or":[
        {category_name:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchedJobCategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getJobCategoryList,
  getJobCategoryById,
  getFilterCategory,
  getAllJobCategory,
  getSearchJobCategory,
  createJobCategory,
  updateJobCategory,
  deleteJobCategory,
};
