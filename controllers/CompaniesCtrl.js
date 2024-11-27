const slugify = require("slugify");
const Companies = require("../models/CompaniesModel");
const asyncHandler = require("express-async-handler");

const getCompaniesList = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const totalCompany = await Companies.countDocuments();
    const totalPages = Math.ceil(totalCompany / limit);
    const nextPage = page < totalPages ? page + 1 : null;

    const companiesList = await Companies.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("country_id")
      .populate("state_id")
      .populate("city_id")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      message: "Companies list fetched successfully",
      data: companiesList,
      page,
      nextPage,
      totalPages,
      totalCompany,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching companies list",
      error: error.message,
    });
  }
});

const getCompaniesById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Companies.findById(id)
      .populate("country_id")
      .populate("state_id")
      .populate("city_id");

    if (!company) {
      res.status(404).json({
        success: false,
        message: "Company not found",
      });
    } else {
      res.json(company);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching company",
      error: error.message,
    });
  }
});

const getCompaniesByFilter = asyncHandler(async (req, res) => {
  try {
    const companies = await Companies.find(req.body)
      .populate("country_id")
      .populate("state_id")
      .populate("city_id")
      .exec();

    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching companies",
      error: error.message,
    });
  }
});

const createCompanies = asyncHandler(async (req, res) => {
  try {
    if (req.body.email) {
      req.body.slug = slugify(req.body.email);
    }

    const company = await Companies.create(req.body);

    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating company",
      error: error.message,
    });
  }
});

const updateCompanies = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Companies.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!company) {
      res.status(404).json({
        success: false,
        message: "Company not found",
      });
    } else {
      res.json(company);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating company",
      error: error.message,
    });
  }
});

const deleteCompanies = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Companies.findByIdAndDelete(id);

    if (!company) {
      res.status(404).json({
        success: false,
        message: "Company not found",
      });
    } else {
      res.json(company);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting company",
      error: error.message,
    });
  }
});

const getSearchCompanies = asyncHandler(async (req, res) => {
  try {
    const companies = await Companies.find({
      $or: [
        { name: { $regex: req.params.key } },
        { location: { $regex: req.params.key } },
      ],
    });

    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error searching companies",
      error: error.message,
    });
  }
});

module.exports = {
  getCompaniesList,
  getCompaniesById,
  getCompaniesByFilter,
  getSearchCompanies,
  createCompanies,
  updateCompanies,
  deleteCompanies,
};
