const mongoose = require('mongoose'); // Import mongoose at the top of your file
const Jobs = require("../models/JobsModel");
const JobTypes = require("../models/JobTypeModel");
const jobShifts = require("../models/JobShiftModel");
const CareerLevels = require("../models/CarrierModel");
const FunctionalAreas = require("../models/FunAreaModel");
const Countries = require("../models/CountriesModel");
const States = require("../models/StatesModel");
const Cities = require("../models/CitiesModel");
const JobExperiences = require("../models/JobExpModel");
const SalaryCurrencies = require("../models/CurrenciesModel");
const SalaryPeriods = require("../models/SalaryPeriodModel");
const DegreeLevels = require("../models/DegreeLevelModel");
const asyncHandler = require("express-async-handler");
const sendResponse = require("../utils/response");

const FilterJobs = async (req, res) => {
  try {
    const {
      isFreelance,
      isFeatured,
      isActive,
    } = req.query;

    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    let filter = {};

    if (req.query.jobTitle) {
      filter.jobTitle = {$regex: req.query.jobTitle,
        $options: "i",
      }
    };
    if (req.query.jobType) {
      const jobType = await JobTypes.findOne({
        name: { $regex: `^${req.query.jobType}$`, $options: "i" },
      });
      filter.jobType = jobType ? jobType._id : null;
    }
    if (req.query.jobShift) {
      const jobShift = await jobShifts.findOne({
        name: { $regex: `^${req.query.jobShift}$`, $options: "i" },
      });
      filter.jobShift = jobShift ? jobShift._id : null;
    }
    if (req.query.careerLevel) {
      const careerLevel = await CareerLevels.findOne({
        name: { $regex: `^${req.query.careerLevel}$`, $options: "i" },
      });
      filter.careerLevel = careerLevel ? careerLevel._id : null;
    }
    if (req.query.functionalArea) {
      const functionalArea = await FunctionalAreas.findOne({
        name: { $regex: `^${req.query.functionalArea}$`, $options: "i" },
      });
      filter.functionalArea = functionalArea ? functionalArea._id : null;
    }
    if (req.query.country) {
      const country = await Countries.findOne({
        name: { $regex: `^${req.query.country}$`, $options: "i" },
      });
      filter.country = country ? country._id : null;
    }
    if (req.query.state) {
      const state = await States.findOne({
        name: { $regex: `^${req.query.state}$`, $options: "i" },
      });
      filter.state = state ? state._id : null;
    }
    if (req.query.city) {
      const city = await Cities.findOne({
        name: { $regex: `^${req.query.city}$`, $options: "i" },
      });
      filter.city = city ? city._id : null;
    }
    if (req.query.experience) {
      const experience = await JobExperiences.findOne({
        name: { $regex: `^${req.query.experience}$`, $options: "i" },
      });
      filter.experience = experience ? experience._id : null;
    }
    if (req.query.degreeLevel) {
      const degreeLevel = await DegreeLevels.findOne({
        name: { $regex: `^${req.query.degreeLevel}$`, $options: "i" },
      });
      filter.degreeLevel = degreeLevel ? degreeLevel._id : null;
    }
    if (req.query.salaryCurrency) {
      const salaryCurrency = await SalaryCurrencies.findOne({
        name: { $regex: `^${req.query.salaryCurrency}$`, $options: "i" },
      });
      filter.salaryCurrency = salaryCurrency ? salaryCurrency._id : null;
    }
    if (req.query.salaryPeriod) {
      const salaryPeriod = await SalaryPeriods.findOne({
        name: { $regex: `^${req.query.salaryPeriod}$`, $options: "i" },
      });
      filter.salaryPeriod = salaryPeriod ? salaryPeriod._id : null;
    }
    if (isFreelance) {
      filter.isFreelance = isFreelance.toLowerCase() === "true";
    }
    if (isFeatured) {
      filter.isFeatured = isFeatured.toLowerCase() === "true";
    }
    if (isActive) {
      filter.isActive = isActive.toLowerCase() === "true";
    }

    console.log("filter:", filter);

    const [jobs, count] = await Promise.all([
      Jobs.aggregate([
        { $match: filter },
        { $lookup: { from: "job_types", localField: "jobType", foreignField: "_id", as: "jobType" } },
        { $lookup: { from: "job_shifts", localField: "jobShift", foreignField: "_id", as: "jobShift" } },
        { $lookup: { from: "career_levels", localField: "careerLevel", foreignField: "_id", as: "careerLevel" } },
        { $lookup: { from: "functional_areas", localField: "functionalArea", foreignField: "_id", as: "functionalArea" } },
        { $lookup: { from: "countries", localField: "country", foreignField: "_id", as: "country" } },
        { $lookup: { from: "states", localField: "state", foreignField: "_id", as: "state" } },
        { $lookup: { from: "cities", localField: "city", foreignField: "_id", as: "city" } },
        { $lookup: { from: "job_experiences", localField: "experience", foreignField: "_id", as: "experience" } },
        { $lookup: { from: "degree_levels", localField: "degreeLevel", foreignField: "_id", as: "degreeLevel" } },
        { $lookup: { from: "salary_currencies", localField: "salary.currency", foreignField: "_id", as: "salary.currency" } },
        { $lookup: { from: "salary_periods", localField: "salary.period", foreignField: "_id", as: "salary.period" } },
        
        
        { $unwind: { path: "$jobType", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$jobShift", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$careerLevel", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$functionalArea", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$experience", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$degreeLevel", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$salary.currency", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$salary.period", preserveNullAndEmptyArrays: true } },
        { $addFields: {
          jobType: "$jobType.job_type",
          jobShift: "$jobShift.job_shift",
          careerLevel: "$careerLevel.career_level",
          functionalArea: "$functionalArea.functional_area",
          country: "$country.country",
          state: "$state.state",
          city: "$city.city",
          experience: "$experience.job_experience",
          degreeLevel: "$degreeLevel.degree_level",
          salaryCurrency: "$salary.currency.currency",
          salaryPeriod: "$salary.period.salary_period",
        } },
        { $project: {
          _id: 1,
          jobTitle: 1,
          jobDescription: 1,
          jobBenefits: 1,
          jobType: 1,
          jobShift: 1,
          careerLevel: 1,
          functionalArea: 1,
          country: 1,
          state: 1,
          city: 1,
          experience: 1,
          degreeLevel: 1,
          salary: 1,
          salaryCurrency: 1,
          salaryPeriod: 1,
          isFreelance: 1,
          isFeatured: 1,
          isActive: 1,
        } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
      ]),
      Jobs.countDocuments(filter),
    ]);

    res.json({
      success: true,
      message: "Filtered Jobs list fetched successfully",
      data: jobs,
      count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching filtered jobs",
      error: error.message,
    });
  }
};
const getJobList = asyncHandler(async (req, res) => {
  try {
    // Extracting page and search query from the request
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = 10; // Set a default limit of 10 jobs per page
    let filter = {};

    // Handle search query if present
    if (req.query.search) {
      filter = {
        $or: [
          { jobTitle: { $regex: req.query.search, $options: 'i' } },
          { jobDescription: { $regex: req.query.search, $options: 'i' } },
          { jobBenefits: { $regex: req.query.search, $options: 'i' } },
        ],
      };
    }

    // Fetching the job list with aggregation and lookup operations
    const [jobs, count] = await Promise.all([
      Jobs.aggregate([
        { $match: filter }, // Match filter for search if provided
        { $lookup: { from: "job_types", localField: "jobType", foreignField: "_id", as: "jobType" } },
        { $lookup: { from: "job_shifts", localField: "jobShift", foreignField: "_id", as: "jobShift" } },
        { $lookup: { from: "career_levels", localField: "careerLevel", foreignField: "_id", as: "careerLevel" } },
        { $lookup: { from: "functional_areas", localField: "functionalArea", foreignField: "_id", as: "functionalArea" } },
        { $lookup: { from: "countries", localField: "country", foreignField: "_id", as: "country" } },
        { $lookup: { from: "states", localField: "state", foreignField: "_id", as: "state" } },
        { $lookup: { from: "cities", localField: "city", foreignField: "_id", as: "city" } },
        { $lookup: { from: "job_experiences", localField: "experience", foreignField: "_id", as: "experience" } },
        { $lookup: { from: "degree_levels", localField: "degreeLevel", foreignField: "_id", as: "degreeLevel" } },
        { $lookup: { from: "salary_currencies", localField: "salary.currency", foreignField: "_id", as: "salary.currency" } },
        { $lookup: { from: "salary_periods", localField: "salary.period", foreignField: "_id", as: "salary.period" } },
        
        // Unwind the lookup results to flatten arrays
        { $unwind: { path: "$jobType", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$jobShift", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$careerLevel", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$functionalArea", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$experience", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$degreeLevel", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$salary.currency", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$salary.period", preserveNullAndEmptyArrays: true } },

        // Add fields for easier access after unwind
        { $addFields: {
          jobType: "$jobType.job_type",
          jobShift: "$jobShift.job_shift",
          careerLevel: "$careerLevel.career_level",
          functionalArea: "$functionalArea.functional_area",
          country: "$country.country",
          state: "$state.state",
          city: "$city.city",
          experience: "$experience.job_experience",
          degreeLevel: "$degreeLevel.degree_level",
          salaryCurrency: "$salary.currency.currency",
          salaryPeriod: "$salary.period.salary_period",
        } },

        // Project the final data to return
        { $project: {
          _id: 1,
          jobTitle: 1,
          jobDescription: 1,
          jobBenefits: 1,
          jobType: 1,
          jobShift: 1,
          careerLevel: 1,
          functionalArea: 1,
          country: 1,
          state: 1,
          city: 1,
          experience: 1,
          degreeLevel: 1,
          salary: 1,
          salaryCurrency: 1,
          salaryPeriod: 1,
          isFreelance: 1,
          isFeatured: 1,
          isActive: 1,
        } },

        // Implement pagination
        { $skip: (page - 1) * limit },
        { $limit: limit },
      ]),

      // Count the total number of jobs for pagination
      Jobs.countDocuments(filter),
    ]);

    // Return the job list along with pagination data
    res.json({
      success: true,
      message: "Jobs list fetched successfully",
      data: jobs,
      count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching job list",
      error: error.message,
    });
  }
});
const getJobById = asyncHandler(async (req, res) => {
  const { id } = req.params; // Get the job ID from the route parameters

  try {
    const job = await Jobs.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Correct way to create ObjectId with 'new'

      // Perform lookups to join related collections
      { $lookup: { from: "job_types", localField: "jobType", foreignField: "_id", as: "jobType" } },
      { $lookup: { from: "job_shifts", localField: "jobShift", foreignField: "_id", as: "jobShift" } },
      { $lookup: { from: "career_levels", localField: "careerLevel", foreignField: "_id", as: "careerLevel" } },
      { $lookup: { from: "functional_areas", localField: "functionalArea", foreignField: "_id", as: "functionalArea" } },
      { $lookup: { from: "countries", localField: "country", foreignField: "_id", as: "country" } },
      { $lookup: { from: "states", localField: "state", foreignField: "_id", as: "state" } },
      { $lookup: { from: "cities", localField: "city", foreignField: "_id", as: "city" } },
      { $lookup: { from: "job_experiences", localField: "experience", foreignField: "_id", as: "experience" } },
      { $lookup: { from: "degree_levels", localField: "degreeLevel", foreignField: "_id", as: "degreeLevel" } },
      { $lookup: { from: "salary_currencies", localField: "salary.currency", foreignField: "_id", as: "salary.currency" } },
      { $lookup: { from: "salary_periods", localField: "salary.period", foreignField: "_id", as: "salary.period" } },

      // Unwind the results of the lookups to flatten arrays
      { $unwind: { path: "$jobType", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$jobShift", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$careerLevel", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$functionalArea", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$experience", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$degreeLevel", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$salary.currency", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$salary.period", preserveNullAndEmptyArrays: true } },

      // Add fields for easier access after unwinding
      { $addFields: {
          jobType: "$jobType.job_type",
          jobShift: "$jobShift.job_shift",
          careerLevel: "$careerLevel.career_level",
          functionalArea: "$functionalArea.functional_area",
          country: "$country.country",
          state: "$state.state",
          city: "$city.city",
          experience: "$experience.job_experience",
          degreeLevel: "$degreeLevel.degree_level",
          salaryCurrency: "$salary.currency.currency",
          salaryPeriod: "$salary.period.salary_period",
      } },

      // Project the final data to return
      { $project: {
          _id: 1,
          jobTitle: 1,
          jobDescription: 1,
          jobBenefits: 1,
          jobType: 1,
          jobShift: 1,
          careerLevel: 1,
          functionalArea: 1,
          country: 1,
          state: 1,
          city: 1,
          experience: 1,
          degreeLevel: 1,
          salary: 1,
          salaryCurrency: 1,
          salaryPeriod: 1,
          isFreelance: 1,
          isFeatured: 1,
          isActive: 1,
      } },
    ]);

    // If no job found
    if (!job || job.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Return the job details
    res.json({
      success: true,
      message: "Job details fetched successfully",
      data: job[0], // Return the first job, since we match by ID
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching job details",
      error: error.message,
    });
  }
});
const createJob = asyncHandler(async (req, res) => {
  try {
    const Job = await Jobs.create(req.body);
    sendResponse(res, Job, "Job added successfully", 200, "");
  } catch (error) {
    sendResponse(res, {}, error.message, 400, "");
  }
});
const updateJob = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedJob = await Jobs.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    sendResponse(res, updatedJob, "Job updated successfully", 200, "");
  } catch (error) {
    sendResponse(res, {}, error.message, 400, "");
  }
});
const deleteJob = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedJob = await Jobs.findByIdAndDelete(id);
    sendResponse(res, deletedJob, "Job deleted successfully", 200, "");
  } catch (error) {
    sendResponse(res, {}, error.message, 400, "");
  }
});

module.exports = {
  getJobList,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  FilterJobs,
};