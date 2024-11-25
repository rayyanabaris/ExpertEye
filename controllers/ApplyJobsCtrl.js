const ApplyJobs = require("../models/ApplyJobsModel");
const asyncHandler = require("express-async-handler");
const sendResponse = require("../utils/response");

const getApplyJob = asyncHandler(async (req, res) => {
  try {
    const limit = Math.max(parseInt(req.query.limit) || 10, 1); // Default limit: 10
    const page = Math.max(parseInt(req.query.page) || 1, 1); // Default page: 1

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return sendResponse(res, {}, "Invalid page or limit", 400, 0);
    }

    // Building filters for aggregation pipeline
    let filter = {};

    if (req.query.search) {
      filter.name = new RegExp("^" + req.query.search, "i");
    }

    if (req.query.name) {
      filter.name = {$regex: req.query.name,
        $options: "i",
      }
    };

    if (req.query.mobile) {
      filter.mobile = {$regex: req.query.mobile,
        $options: "i",
      }
    };

    if (req.query.email) {
      filter.email = {$regex: req.query.email,
        $options: "i",
      }
    };

    // Filters without requiring lookups
    if (req.query.expectedSalary) {
      const [fromSalary, toSalary] = req.query.expectedSalary.split(",");
      filter["userDetails.expectedSalary"] = {
        $gte: parseFloat(fromSalary) || 0,
        $lte: parseFloat(toSalary) || Number.MAX_VALUE,
      };
    }

    // Filter by age using date_of_Birth
    if (req.query.age) {
      const [fromAge, toAge] = req.query.age.split(",");
      const currentDate = new Date(); // Current date for age calculation

      filter["userDetails.date_of_Birth"] = {
        $gte: new Date(
          currentDate.getFullYear() - (parseInt(toAge) || 0),
          currentDate.getMonth(),
          currentDate.getDate()
        ), // maximum birth date for `toAge`
        $lte: new Date(
          currentDate.getFullYear() - (parseInt(fromAge) || 0),
          currentDate.getMonth(),
          currentDate.getDate()
        ), // minimum birth date for `fromAge`
      };
    }

    if (req.query.salaryCurrency) {
      filter["userDetails.salaryCurrency"] = {
        $regex: req.query.salaryCurrency,
        $options: "i",
      };
    }

    // Filters requiring lookups
    if (req.query.gender) {
      filter["userDetails.gender.gender"] = {
        $regex: req.query.gender,
        $options: "i",
      };
    }

    if (req.query.jobSkills) {
      filter["userDetails.jobSkills.job_skills"] = {
        $regex: req.query.jobSkills,
        $options: "i",
      };
    }

    if (req.query.maritalStatus) {
      filter["userDetails.maritalStatus.marital_status"] = {
        $regex: req.query.maritalStatus,
        $options: "i",
      };
    }

    if (req.query.nationality) {
      filter["userDetails.country.nationality"] = {
        $regex: req.query.nationality,
        $options: "i",
      };
    }

    if (req.query.country) {
      filter["userDetails.country.name"] = {
        $regex: req.query.country,
        $options: "i",
      };
    }

    if (req.query.state) {
      filter["userDetails.state.state"] = {
        $regex: req.query.state,
        $options: "i",
      };
    }

    if (req.query.city) {
      filter["userDetails.city.city"] = {
        $regex: req.query.city,
        $options: "i",
      };
    }

    if (req.query.jobExperience) {
      filter["userDetails.jobExperience.job_experience"] = {
        $regex: req.query.jobExperience,
        $options: "i",
      };
    }

    if (req.query.careerLevel) {
      filter["userDetails.careerLevel.career_level"] = {
        $regex: req.query.careerLevel,
        $options: "i",
      };
    }

    if (req.query.industry) {
      filter["userDetails.industry.industry"] = {
        $regex: req.query.industry,
        $options: "i",
      };
    }

    if (req.query.functionalArea) {
      filter["userDetails.functionalArea.functional_area"] = {
        $regex: req.query.functionalArea,
        $options: "i",
      };
    }

    // Aggregation for count and paginated data
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "jobDetails",
        },
      },
      { $unwind: "$jobDetails" },
      {
        $lookup: {
          from: "countries",
          localField: "userDetails.country",
          foreignField: "_id",
          as: "userDetails.country",
        },
      },
      {
        $lookup: {
          from: "states",
          localField: "userDetails.state",
          foreignField: "_id",
          as: "userDetails.state",
        },
      },
      {
        $lookup: {
          from: "cities",
          localField: "userDetails.city",
          foreignField: "_id",
          as: "userDetails.city",
        },
      },
      {
        $lookup: {
          from: "job_experiences",
          localField: "userDetails.jobExperience",
          foreignField: "_id",
          as: "userDetails.jobExperience",
        },
      },
      {
        $lookup: {
          from: "job_skills",
          localField: "userDetails.jobSkills",
          foreignField: "_id",
          as: "userDetails.jobSkills",
        },
      },
      {
        $lookup: {
          from: "genders",
          localField: "userDetails.gender",
          foreignField: "_id",
          as: "userDetails.gender",
        },
      },
      {
        $lookup: {
          from: "marital_statuses",
          localField: "userDetails.maritalStatus",
          foreignField: "_id",
          as: "userDetails.maritalStatus",
        },
      },
      {
        $lookup: {
          from: "countries",
          localField: "userDetails.nationality",
          foreignField: "_id",
          as: "userDetails.nationality",
        },
      },
      {
        $lookup: {
          from: "career_levels",
          localField: "userDetails.careerLevel",
          foreignField: "_id",
          as: "userDetails.careerLevel",
        },
      },
      {
        $lookup: {
          from: "industries",
          localField: "userDetails.industry",
          foreignField: "_id",
          as: "userDetails.industry",
        },
      },
      {
        $lookup: {
          from: "functional_areas",
          localField: "userDetails.functionalArea",
          foreignField: "_id",
          as: "userDetails.functionalArea",
        },
      },

      { $match: filter }, // Apply filters at this stage
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          mobile: 1,
          resume: 1,
          createdAt: 1,
          jobTitle: "$jobDetails.job_title",
          userDetails: {
            age: {
              $floor: {
                $divide: [
                  {
                    $subtract: [
                      new Date(), // Current date
                      { $toDate: "$userDetails.date_of_Birth" }, // Ensure date_of_Birth is a Date type
                    ],
                  },
                  365 * 24 * 60 * 60 * 1000, // Convert milliseconds to years (approx. year length)
                ],
              },
            },
            firstname: "$userDetails.firstname",
            lastname: "$userDetails.lastname",
            email: "$userDetails.email",
            date_of_Birth: "$userDetails.date_of_Birth",
            country: { $arrayElemAt: ["$userDetails.country.name", 0] },
            state: { $arrayElemAt: ["$userDetails.state.state", 0] },
            city: { $arrayElemAt: ["$userDetails.city.city", 0] },
            nationality: {
              $arrayElemAt: ["$userDetails.nationality.nationality", 0],
            },
            gender: { $arrayElemAt: ["$userDetails.gender.gender", 0] },
            maritalStatus: {
              $arrayElemAt: ["$userDetails.maritalStatus.marital_status", 0],
            },
            careerLevel: {
              $arrayElemAt: ["$userDetails.careerLevel.career_level", 0],
            },
            industry: { $arrayElemAt: ["$userDetails.industry.industry", 0] },
            jobSkills: { $arrayElemAt: ["$userDetails.jobSkills.job_skills", 0] },
            functionalArea: {
              $arrayElemAt: ["$userDetails.functionalArea.functional_area", 0],
            },
            jobExperience: {
              $arrayElemAt: ["$userDetails.jobExperience.job_experience", 0],
            },
            expectedSalary: "$userDetails.expectedSalary",
            currentSalary: "$userDetails.currentSalary",
            salaryCurrency: "$userDetails.salaryCurrency",
          },
        },
      },
    ];

    // Clone the pipeline for counting
    const countPipeline = [...pipeline.slice(0, -1), { $count: "total" }];

    // Add pagination to the main pipeline
    pipeline.push(
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $addFields: {
          created_at: {
            $dateToString: {
              date: "$createdAt",
              format: "%d-%m-%Y %H:%M:%S",
              timezone: "Asia/Kolkata",
            },
          },
        },
      }
    );

    // Execute both pipelines concurrently
    const [filteredJobs, totalCountResult] = await Promise.all([
      ApplyJobs.aggregate(pipeline),
      ApplyJobs.aggregate(countPipeline),
    ]);

    const totalFilteredCount = totalCountResult[0]?.total || 0; // Safely access count
    const totalPages = Math.ceil(totalFilteredCount / limit);

    const nextPage =
      page < totalPages
        ? `http://localhost:4000/api/apply/job?page=${page + 1}&limit=${limit}`
        : null;
    const prevPage =
      page > 1
        ? `http://localhost:4000/api/apply/job?page=${page - 1}&limit=${limit}`
        : null;

    sendResponse(res, filteredJobs, "ApplyJob list fetched successfully", 200, {
      totalCount: totalFilteredCount,
      totalPages,
      nextPage,
      prevPage,
    });
  } catch (error) {
    console.error("Error in getApplyJob:", error.message);
    sendResponse(res, {}, error.message, 400, 0);
  }
});
const getApplyJobList = asyncHandler(async (req, res) => {
  try {
    const allApplyJob = await ApplyJobs.find();
    sendResponse(res, allApplyJob, "ApplyJob list fetched successfully", 200);
  } catch (error) {
    sendResponse(res, {}, error.message, 400, 0);
  }
});
const createApplyJob = asyncHandler(async (req, res) => {
  try {
    req.body.user_id = req.user;
    const ApplyJob = await ApplyJobs.create(req.body);
    sendResponse(res, ApplyJob, "ApplyJob added successfully", 200, "");
  } catch (error) {
    sendResponse(res, {}, error.message, 400, "");
  }
});
const updateApplyJob = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedApplyJob = await ApplyJobs.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    sendResponse(
      res,
      updatedApplyJob,
      "ApplyJob updated successfully",
      200,
      ""
    );
  } catch (error) {
    sendResponse(res, {}, error.message, 400, "");
  }
});
const deleteApplyJob = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedApplyJob = await ApplyJobs.findByIdAndDelete(id);
    sendResponse(
      res,
      deletedApplyJob,
      "ApplyJob deleted successfully",
      200,
      ""
    );
  } catch (error) {
    sendResponse(res, {}, error.message, 400, "");
  }
});

module.exports = {
  getApplyJobList,
  getApplyJob,
  createApplyJob,
  updateApplyJob,
  deleteApplyJob,
};
