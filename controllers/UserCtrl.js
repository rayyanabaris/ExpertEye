const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendResponse = require("../utils/response");
const Genders = require("../models/GenderModel");
const MaritalStatus = require("../models/MaritalStatusRoute");
const Nationality = require("../models/CountriesModel");
const Countries = require("../models/CountriesModel");
const States = require("../models/StatesModel");
const Cities = require("../models/CitiesModel");
const JobExperience = require("../models/JobExpModel");
const CareerLevel = require("../models/CarrierModel");
const Industries = require("../models/IndustriesModel");
const FunctionalArea = require("../models/FunAreaModel");
const JobSkills = require("../models/JobSkillsModel");
const Users = require("../models/UserModel");

// Front User API's //

const addUser = async (req, res) => {
  try {
    const User = await Users.create(req.body);
    sendResponse(res, User, "User added successfully", 200, "");
  } catch (error) {
    sendResponse(res, {}, error.message, 403, "");
  }
};
const loginUser = async (req, res) => {
  try {
    const User = await Users.findOne({
      email: new RegExp(req.body.email, "i"),
    });
    if (
      User == null ||
      (User != null &&
        (await User.isPasswordMatched(req.body.password)) == false)
    ) {
      res.error = true;
      res.data = { message: "You are not authorized" };
      res.statusCode = "401";
      // next();
    } else {
      const token = jwt.sign({ User_id: User._id }, process.env.JWT_SECRET);

      req.user = User;

      res.status(200).json({
        error: false,
        message: "You are authorized",
        token: token,
        statusCode: 200,
      });
    }

    //    console.log("wag")
    // next();
  } catch (error) {
    sendResponse(res, {}, error.message, 403, "");
    // next();
  }
};
const getUserProfile = async (req, res) => {
  try {
    // Use req.user to get the authenticated user's data directly
    const userId = req.user?._id; // `req.user` already contains the full user object

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Use aggregate to fetch user data with associated info
    const user = await Users.aggregate([
      { $match: { _id: userId } }, // Match user by the user _id from the authenticated user
      {
        $lookup: {
          from: "genders",
          localField: "gender",
          foreignField: "_id",
          as: "gender",
        },
      },
      {
        $lookup: {
          from: "marital_statuses",
          localField: "maritalStatus",
          foreignField: "_id",
          as: "maritalStatus",
        },
      },
      {
        $lookup: {
          from: "countries",
          localField: "nationality",
          foreignField: "_id",
          as: "nationality",
        },
      },
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "country",
        },
      },
      {
        $lookup: {
          from: "states",
          localField: "state",
          foreignField: "_id",
          as: "state",
        },
      },
      {
        $lookup: {
          from: "cities",
          localField: "city",
          foreignField: "_id",
          as: "city",
        },
      },
      {
        $lookup: {
          from: "job_experiences",
          localField: "jobExperience",
          foreignField: "_id",
          as: "jobExperience",
        },
      },
      {
        $lookup: {
          from: "career_levels",
          localField: "careerLevel",
          foreignField: "_id",
          as: "careerLevel",
        },
      },
      {
        $lookup: {
          from: "industries",
          localField: "industry",
          foreignField: "_id",
          as: "industry",
        },
      },
      {
        $lookup: {
          from: "functional_areas",
          localField: "functionalArea",
          foreignField: "_id",
          as: "functionalArea",
        },
      },
      {
        $lookup: {
          from: "job_skills",
          localField: "jobSkills",
          foreignField: "_id",
          as: "jobSkills",
        },
      },
      { $unwind: { path: "$gender", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$maritalStatus", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$nationality", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$jobExperience", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$careerLevel", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$industry", preserveNullAndEmptyArrays: true } },
      {
        $unwind: { path: "$functionalArea", preserveNullAndEmptyArrays: true },
      },
      { $unwind: { path: "$jobSkills", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          gender: "$gender.gender",
          maritalStatus: "$maritalStatus.marital_status",
          nationality: "$nationality.nationality",
          country: "$country.name",
          state: "$state.state",
          city: "$city.city",
          jobExperience: "$jobExperience.job_experience",
          careerLevel: "$careerLevel.career_level",
          industry: "$industry.industry",
          functionalArea: "$functionalArea.functional_area",
          jobSkills: "$jobSkills.job_skills",
          age: {
            $dateDiff: {
              startDate: { $toDate: "$date_of_Birth" },
              endDate: "$$NOW",
              unit: "year",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          firstname: 1,
          lastname: 1,
          email: 1,
          mobile: 1,
          date_of_Birth: 1,
          age: 1,
          image: 1,
          coverImage: 1,
          resume: 1,
          lang: 1,
          fatherName: 1,
          isImmediateAvailable: 1,
          gender: 1,
          maritalStatus: 1,
          nationality: 1,
          country: 1,
          state: 1,
          city: 1,
          streetAddress: 1,
          jobExperience: 1,
          careerLevel: 1,
          industry: 1,
          functionalArea: 1,
          jobSkills: 1,
          isActive: 1,
          verified: 1,
          nationalIdCardNumber: 1,
          currentSalary: 1,
          expectedSalary: 1,
          salaryCurrency: 1,
        },
      },
    ]);

    // Check if user exists
    if (!user || user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return success response with user data
    res.json({
      success: true,
      message: "User profile fetched successfully",
      data: user[0], // Only return the first element, as it matches one user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching user profile",
      error: error.message,
    });
  }
};
const updateUserProfile = async (req, res) => {
  try {
    console.log(req.body, "test");
    const User = await Users.findByIdAndUpdate(req.user, req.body, {
      new: true,
    });

    // let allKeys = await Client.keys("User:*");
    // if (allKeys.length != 0) {
    //   const del = await Client.del(allKeys);
    // }
    sendResponse(res, User, "Updated Successfully", 200, "");
  } catch (error) {
    sendResponse(res, {}, error.message, 403, "");
  }
};

// Admin User API'S //

const loginAdmin = async (req, res) => {
  try {
    // Find the user by email (case-insensitive search)
    const adminUser = await Users.findOne({
      email: new RegExp(req.body.email, "i"), // Case-insensitive email matching
    });

    // If the admin user does not exist
    if (!adminUser) {
      return res.status(401).json({
        error: true,
        message: "Admin user not found",
      });
    }

    // Check if the user has the "admin" role
    if (adminUser.role !== "admin") {
      return res.status(403).json({
        error: true,
        message: "You are not authorized as an admin",
      });
    }

    // Check if the password is correct
    const isPasswordCorrect = await adminUser.isPasswordMatched(
      req.body.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: true,
        message: "Incorrect password",
      });
    }

    // If authentication is successful, generate a JWT token
    const token = jwt.sign({ User_id: adminUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h", // Optional: Add expiration for better security
    });

    // Respond with the JWT token and success message
    return res.status(200).json({
      error: false,
      message: "Admin logged in successfully",
      token: token,
      statusCode: 200,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Login error:", error);

    // Send a generic authentication failure message in case of error
    return res.status(403).json({
      error: true,
      message: "Authentication failed. Please try again.",
    });
  }
};
const getAdminProfile = async (req, res) => {
  try {
    // Use req.user to get the authenticated user's data directly
    const userId = req.user?._id; // `req.user` already contains the full user object

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Use aggregate to fetch user data with associated info
    const user = await Users.aggregate([
      { $match: { _id: userId } }, // Match user by the user _id from the authenticated user
      {
        $lookup: {
          from: "genders",
          localField: "gender",
          foreignField: "_id",
          as: "gender",
        },
      },
      {
        $lookup: {
          from: "marital_statuses",
          localField: "maritalStatus",
          foreignField: "_id",
          as: "maritalStatus",
        },
      },
      {
        $lookup: {
          from: "countries",
          localField: "nationality",
          foreignField: "_id",
          as: "nationality",
        },
      },
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "country",
        },
      },
      {
        $lookup: {
          from: "states",
          localField: "state",
          foreignField: "_id",
          as: "state",
        },
      },
      {
        $lookup: {
          from: "cities",
          localField: "city",
          foreignField: "_id",
          as: "city",
        },
      },
      {
        $lookup: {
          from: "job_experiences",
          localField: "jobExperience",
          foreignField: "_id",
          as: "jobExperience",
        },
      },
      {
        $lookup: {
          from: "career_levels",
          localField: "careerLevel",
          foreignField: "_id",
          as: "careerLevel",
        },
      },
      {
        $lookup: {
          from: "industries",
          localField: "industry",
          foreignField: "_id",
          as: "industry",
        },
      },
      {
        $lookup: {
          from: "functional_areas",
          localField: "functionalArea",
          foreignField: "_id",
          as: "functionalArea",
        },
      },
      { $unwind: { path: "$gender", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$maritalStatus", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$nationality", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$jobExperience", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$careerLevel", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$industry", preserveNullAndEmptyArrays: true } },
      {
        $unwind: { path: "$functionalArea", preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          gender: "$gender.gender",
          maritalStatus: "$maritalStatus.marital_status",
          nationality: "$nationality.nationality",
          country: "$country.name",
          state: "$state.state",
          city: "$city.city",
          jobExperience: "$jobExperience.job_experience",
          careerLevel: "$careerLevel.career_level",
          industry: "$industry.industry",
          functionalArea: "$functionalArea.functional_area",
          age: {
            $dateDiff: {
              startDate: { $toDate: "$date_of_Birth" },
              endDate: "$$NOW",
              unit: "year",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          firstname: 1,
          lastname: 1,
          email: 1,
          mobile: 1,
          date_of_Birth: 1,
          age: 1,
          image: 1,
          coverImage: 1,
          resume: 1,
          lang: 1,
          fatherName: 1,
          isImmediateAvailable: 1,
          gender: 1,
          maritalStatus: 1,
          nationality: 1,
          country: 1,
          state: 1,
          city: 1,
          streetAddress: 1,
          jobExperience: 1,
          careerLevel: 1,
          industry: 1,
          functionalArea: 1,
          isActive: 1,
          verified: 1,
          nationalIdCardNumber: 1,
          currentSalary: 1,
          expectedSalary: 1,
          salaryCurrency: 1,
        },
      },
    ]);

    // Check if user exists
    if (!user || user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return success response with user data
    res.json({
      success: true,
      message: "User profile fetched successfully",
      data: user[0], // Only return the first element, as it matches one user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching user profile",
      error: error.message,
    });
  }
};
const updateAdminProfile = async (req, res) => {
  try {
    console.log(req.body, "test");
    const User = await Users.findByIdAndUpdate(req.user, req.body, {
      new: true,
    });

    // let allKeys = await Client.keys("User:*");
    // if (allKeys.length != 0) {
    //   const del = await Client.del(allKeys);
    // }
    sendResponse(res, User, "Updated Successfully", 200, "");
  } catch (error) {
    sendResponse(res, {}, error.message, 403, "");
  }
};
const FilterUsers = async (req, res) => {
  try {
    const { fromAge, toAge } = req.query;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    let filter = {};

    if (req.query.salaryCurrency) {
      filter.salaryCurrency = req.query.salaryCurrency;
    }

    if (req.query.verified) {
      filter.verified = req.query.verified.toLowerCase() === "true";
    }

    if (req.query.isActive) {
      filter.isActive = req.query.isActive.toLowerCase() === "true";
    }

    if (req.query.isImmediateAvailable) {
      filter.isImmediateAvailable =
        req.query.isImmediateAvailable.toLowerCase() === "true";
    }

    if (req.query.expectedSalary) {
      const [fromSalary, toSalary] = req.query.expectedSalary.split(",");
      filter.expectedSalary = {
        $gte: parseInt(fromSalary),
        $lte: parseInt(toSalary),
      };
    }

    if (req.query.currentSalary) {
      const [fromSalary, toSalary] = req.query.currentSalary.split(",");
      filter.currentSalary = {
        $gte: parseInt(fromSalary),
        $lte: parseInt(toSalary),
      };
    }
    if (req.query.gender) {
      const gender = await Genders.findOne({ name: req.query.gender });
      filter.gender = gender ? gender._id : null;
    }

    if (req.query.jobSkills) {
      const jobSkills = await JobSkills.findOne({ name: req.query.jobSkills });
      filter.jobSkills = jobSkills ? jobSkills._id : null;
    }
    if (req.query.maritalStatus) {
      const maritalStatus = await MaritalStatus.findOne({
        name: req.query.maritalStatus,
      });
      filter.maritalStatus = maritalStatus ? maritalStatus._id : null;
    }

    if (req.query.nationality) {
      const nationality = await Nationality.findOne({
        name: { $regex: `^${req.query.nationality}$`, $options: "i" },
      });
      filter.nationality = nationality ? nationality._id : null;
    }

    if (req.query.country) {
      const country = await Countries.findOne({
        name: { $regex: `^${req.query.country}$`, $options: "i" },
      });
      filter.country = country ? country._id : null;
    }
    if (req.query.state) {
      const state = await States.findOne({ name: req.query.state });
      filter.state = state ? state._id : null;
    }

    if (req.query.city) {
      const city = await Cities.findOne({ name: req.query.city });
      filter.city = city ? city._id : null;
    }

    if (req.query.jobExperience) {
      const jobExperience = await JobExperience.findOne({
        name: req.query.jobExperience,
      });
      filter.jobExperience = jobExperience ? jobExperience._id : null;
    }

    if (req.query.careerLevel) {
      const careerLevel = await CareerLevel.findOne({
        name: req.query.careerLevel,
      });
      filter.careerLevel = careerLevel ? careerLevel._id : null;
    }

    if (req.query.industry) {
      const industry = await Industries.findOne({ name: req.query.industry });
      filter.industry = industry ? industry._id : null;
    }

    if (req.query.functionalArea) {
      const functionalArea = await FunctionalArea.findOne({
        name: req.query.functionalArea,
      });
      filter.functionalArea = functionalArea ? functionalArea._id : null;
    }

    if (fromAge && toAge) {
      const today = new Date();
      const fromDOB = new Date(today.getFullYear() - parseInt(fromAge), 0, 1);
      const toDOB = new Date(today.getFullYear() - parseInt(toAge), 11, 31);

      // Ensure toDOB is greater than fromDOB
      filter.date_of_Birth = { $gte: toDOB, $lte: fromDOB };
    }

    console.log("filter:", filter);

    const [users, count] = await Promise.all([
      Users.aggregate([
        { $match: filter },
        {
          $lookup: {
            from: "job_skills",
            localField: "jobSkills",
            foreignField: "_id",
            as: "jobSkills",
          },
        },
        {
          $lookup: {
            from: "genders",
            localField: "gender",
            foreignField: "_id",
            as: "gender",
          },
        },
        {
          $lookup: {
            from: "marital_statuses",
            localField: "maritalStatus",
            foreignField: "_id",
            as: "maritalStatus",
          },
        },
        {
          $lookup: {
            from: "countries",
            localField: "nationality",
            foreignField: "_id",
            as: "nationality",
          },
        },
        {
          $lookup: {
            from: "countries",
            localField: "country",
            foreignField: "_id",
            as: "country",
          },
        },
        {
          $lookup: {
            from: "states",
            localField: "state",
            foreignField: "_id",
            as: "state",
          },
        },
        {
          $lookup: {
            from: "cities",
            localField: "city",
            foreignField: "_id",
            as: "city",
          },
        },
        {
          $lookup: {
            from: "job_experiences",
            localField: "jobExperience",
            foreignField: "_id",
            as: "jobExperience",
          },
        },
        {
          $lookup: {
            from: "career_levels",
            localField: "careerLevel",
            foreignField: "_id",
            as: "careerLevel",
          },
        },
        {
          $lookup: {
            from: "industries",
            localField: "industry",
            foreignField: "_id",
            as: "industry",
          },
        },
        {
          $lookup: {
            from: "functional_areas",
            localField: "functionalArea",
            foreignField: "_id",
            as: "functionalArea",
          },
        },
        { $unwind: { path: "$gender", preserveNullAndEmptyArrays: true } },
        {
          $unwind: { path: "$maritalStatus", preserveNullAndEmptyArrays: true },
        },
        { $unwind: { path: "$nationality", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$country", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$state", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
        {
          $unwind: { path: "$jobExperience", preserveNullAndEmptyArrays: true },
        },
        { $unwind: { path: "$careerLevel", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$industry", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$jobSkills", preserveNullAndEmptyArrays: true } },
        {
          $unwind: {
            path: "$functionalArea",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            gender: "$gender.gender",
            maritalStatus: "$maritalStatus.marital_status",
            nationality: "$nationality.nationality",
            country: "$country.name",
            state: "$state.state",
            city: "$city.city",
            jobExperience: "$jobExperience.job_experience",
            careerLevel: "$careerLevel.career_level",
            industry: "$industry.industry",
            functionalArea: "$functionalArea.functional_area",
            jobSkills: "$jobSkills.job_skills",
            age: {
              $dateDiff: {
                startDate: { $toDate: "$date_of_Birth" }, // Fix here
                endDate: "$$NOW",
                unit: "year",
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            firstname: 1,
            lastname: 1,
            email: 1,
            mobile: 1,
            date_of_Birth: 1,
            age: 1,
            image: 1,
            coverImage: 1,
            resume: 1,
            lang: 1,
            fatherName: 1,
            dateOfBirth: 1,
            isImmediateAvailable: 1,
            gender: 1,
            maritalStatus: 1,
            nationality: 1,
            country: 1,
            state: 1,
            city: 1,
            streetAddress: 1,
            jobExperience: 1,
            careerLevel: 1,
            industry: 1,
            functionalArea: 1,
            jobSkills: 1,
            isActive: 1,
            verified: 1,
            nationalIdCardNumber: 1,
            currentSalary: 1,
            expectedSalary: 1,
            salaryCurrency: 1,
          },
        },
        { $skip: (page - 1) * limit },
        { $limit: limit },
      ]),
      Users.countDocuments(filter),
    ]);

    res.json({
      success: true,
      message: "Filtered Users list fetched successfully",
      data: users,
      count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching age filtered users",
      error: error.message,
    });
  }
};
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const (getaUser) = await Users.aggregate.findById(id);
    //.populate("state_id")
    //.exec();
    res.json(getaUser);
  } catch (error) {
    throw new Error(error);
  }
});


const getUsersById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await Users.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "job_skills",
          localField: "jobSkills",
          foreignField: "_id",
          as: "jobSkills",
        },
      },
      {
        $lookup: {
          from: "genders",
          localField: "gender",
          foreignField: "_id",
          as: "gender",
        },
      },
      {
        $lookup: {
          from: "marital_statuses",
          localField: "maritalStatus",
          foreignField: "_id",
          as: "maritalStatus",
        },
      },
      {
        $lookup: {
          from: "countries",
          localField: "nationality",
          foreignField: "_id",
          as: "nationality",
        },
      },
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "country",
        },
      },
      {
        $lookup: {
          from: "states",
          localField: "state",
          foreignField: "_id",
          as: "state",
        },
      },
      {
        $lookup: {
          from: "cities",
          localField: "city",
          foreignField: "_id",
          as: "city",
        },
      },
      {
        $lookup: {
          from: "job_experiences",
          localField: "jobExperience",
          foreignField: "_id",
          as: "jobExperience",
        },
      },
      {
        $lookup: {
          from: "career_levels",
          localField: "careerLevel",
          foreignField: "_id",
          as: "careerLevel",
        },
      },
      {
        $lookup: {
          from: "industries",
          localField: "industry",
          foreignField: "_id",
          as: "industry",
        },
      },
      {
        $lookup: {
          from: "functional_areas",
          localField: "functionalArea",
          foreignField: "_id",
          as: "functionalArea",
        },
      },
      {
        $unwind: { path: "$gender", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$maritalStatus", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$nationality", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$country", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$state", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$city", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$jobExperience", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$careerLevel", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$industry", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$functionalArea", preserveNullAndEmptyArrays: true },
      },
      { $unwind: { path: "$jobSkills", preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          gender: "$gender.gender",
          maritalStatus: "$maritalStatus.marital_status",
          nationality: "$nationality.nationality",
          country: "$country.name",
          state: "$state.state",
          city: "$city.city",
          jobExperience: "$jobExperience.job_experience",
          careerLevel: "$careerLevel.career_level",
          industry: "$industry.industry",
          functionalArea: "$functionalArea.functional_area",
          jobSkills: "$jobSkills.job_skills",
          age: {
            $dateDiff: {
              startDate: { $toDate: "$date_of_Birth" },
              endDate: "$$NOW",
              unit: "year",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          firstname: 1,
          lastname: 1,
          email: 1,
          mobile: 1,
          date_of_Birth: 1,
          age: 1,
          image: 1,
          coverImage: 1,
          resume: 1,
          lang: 1,
          fatherName: 1,
          dateOfBirth: 1,
          isImmediateAvailable: 1,
          gender: 1,
          maritalStatus: 1,
          nationality: 1,
          country: 1,
          state: 1,
          city: 1,
          streetAddress: 1,
          jobExperience: 1,
          jobSkills: 1,
          careerLevel: 1,
          industry: 1,
          functionalArea: 1,
          isActive: 1,
          verified: 1,
          nationalIdCardNumber: 1,
          currentSalary: 1,
          expectedSalary: 1,
          salaryCurrency: 1,
        },
      },
    ]);

    if (!user || user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User fetched successfully",
      data: user[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: error.message,
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = 10;

    // Validate page parameter
    if (!page || isNaN(page) || page < 1) {
      throw new Error("Invalid page number");
    }

    const skip = (page - 1) * limit;

    let filter = {};

    const users = await Users.aggregate([
      {
        $lookup: {
          from: "job_skills",
          localField: "jobSkills",
          foreignField: "_id",
          as: "jobSkills",
        },
      },
      {
        $lookup: {
          from: "genders",
          localField: "gender",
          foreignField: "_id",
          as: "gender",
        },
      },
      {
        $lookup: {
          from: "marital_statuses",
          localField: "maritalStatus",
          foreignField: "_id",
          as: "maritalStatus",
        },
      },
      {
        $lookup: {
          from: "countries",
          localField: "nationality",
          foreignField: "_id",
          as: "nationality",
        },
      },
      {
        $lookup: {
          from: "countries",
          localField: "country",
          foreignField: "_id",
          as: "country",
        },
      },
      {
        $lookup: {
          from: "states",
          localField: "state",
          foreignField: "_id",
          as: "state",
        },
      },
      {
        $lookup: {
          from: "cities",
          localField: "city",
          foreignField: "_id",
          as: "city",
        },
      },
      {
        $lookup: {
          from: "job_experiences",
          localField: "jobExperience",
          foreignField: "_id",
          as: "jobExperience",
        },
      },
      {
        $lookup: {
          from: "career_levels",
          localField: "careerLevel",
          foreignField: "_id",
          as: "careerLevel",
        },
      },
      {
        $lookup: {
          from: "industries",
          localField: "industry",
          foreignField: "_id",
          as: "industry",
        },
      },
      {
        $lookup: {
          from: "functional_areas",
          localField: "functionalArea",
          foreignField: "_id",
          as: "functionalArea",
        },
      },
      {
        $unwind: {
          path: "$gender",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$maritalStatus",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$nationality",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$country",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$state",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$city",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$jobExperience",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$careerLevel",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$industry",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$functionalArea",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$jobSkills",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          gender: "$gender.gender",
          maritalStatus: "$maritalStatus.marital_status",
          nationality: "$nationality.nationality",
          country: "$country.name",
          state: "$state.state",
          city: "$city.city",
          jobExperience: "$jobExperience.job_experience",
          careerLevel: "$careerLevel.career_level",
          industry: "$industry.industry",
          functionalArea: "$functionalArea.functional_area",
          jobSkills: "$jobSkills.job_skills",
          age: {
            $dateDiff: {
              startDate: { $toDate: "$date_of_Birth" },
              endDate: "$$NOW",
              unit: "year",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          firstname: 1,
          lastname: 1,
          email: 1,
          mobile: 1,
          date_of_Birth: 1,
          age: 1,
          image: 1,
          coverImage: 1,
          resume: 1,
          lang: 1,
          fatherName: 1,
          dateOfBirth: 1,
          isImmediateAvailable: 1,
          gender: 1,
          maritalStatus: 1,
          nationality: 1,
          country: 1,
          state: 1,
          city: 1,
          streetAddress: 1,
          jobExperience: 1,
          careerLevel: 1,
          industry: 1,
          functionalArea: 1,
          jobSkills: 1,
          isActive: 1,
          verified: 1,
          nationalIdCardNumber: 1,
          currentSalary: 1,
          expectedSalary: 1,
          salaryCurrency: 1,
        },
      },
    ])
      .skip(skip)
      .limit(limit);

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }

    res.json({
      success: true,
      message: "Users fetched successfully",
      data: users,
      totalPages: Math.ceil((await Users.countDocuments()) / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const User = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    sendResponse(res, User, "User updated successfully", 200, "");
  } catch (error) {
    sendResponse(res, {}, error.message, 403, "");
  }
};

// Admin and User API'S

const findUser = async (req, res, next) => {
  try {
    const { count, page } = req.query;
    const [User, totalCount] = await Promise.all([
      Users.aggregate([{ $skip: count * page }, { $limit: Number(count) }]),
      Users.aggregate([{ $count: "count" }]),
    ]);
    res.data = User;
    res.count = totalCount.length == 0 ? 0 : totalCount[0].count;
    res.statusCode = "200";
    next();
  } catch (error) {
    sendResponse(res, {}, error.message, 403, "");
  }
};
const deleteUser = async (req, res) => {
  try {
    const User = await Users.findByIdAndDelete(req.params.id);
    sendResponse(res, User, "User deleted successfully", 200, "");
  } catch (error) {
    sendResponse(res, {}, error.message, 403, "");
  }
};
const pagination = async (req, res, next) => {
  try {
    let client = await Client.get(
      `User:UserPagination:${req.params.count}:${req.params.page}`
    );
    let User;
    let count;
    if (client == null) {
      [User, count] = await Promise.all([
        Users.aggregate([
          {
            $skip: req.params.count * req.params.page,
          },
          {
            $limit: Number(req.params.count),
          },
        ]),
        Users.find().countDocuments(),
      ]);
      await Client.set(
        `User:UserPagination:${req.params.count}:${req.params.page}`,
        JSON.stringify({ User, count })
      );
    } else {
      let data = JSON.parse(client);
      User = data.User;
      count = data.count;
    }
    res.data = { User, count };
    res.statusCode = "200";
    next();
  } catch (error) {
    sendResponse(res, {}, error.message, 403, "");
  }
};
const passwordChange = async (req, res) => {
  try {
    console.log(req.User);
    const User = await Users.findById(req.User);
    if (Users.password != undefined || Users.password != "") {
      if ((await Users.isPasswordMatched(req.body.oldPassword)) == false) {
        throw new Error("Enter current password");
      }
    }

    if (req.body.newPassword != req.body.confirmPassword) {
      throw new Error("New password and old password must matched");
    }

    if (!passwordCheck(req.body.confirmPassword)) {
      throw new Error("Password must be 4 digit");
    }

    Users.password = req.body.confirmPassword;
    await Users.save();

    sendResponse(res, User, "password change successfully", 200, "");
    // res.data = { mesage: "success" };
    // res.statusCode = "200";
    // next();
  } catch (error) {
    sendResponse(res, {}, error.message, 400, "");
    // res.error = true;
    // res.statusCode = "403";
    // res.message = error.message;
    // res.data = {};
    // next();
  }
};
const resetPassword = async (req, res, next) => {
  try {
    req.body = req.data;
    const decoded = jwt.verify(req.body.user_id, "sdacasdc");
    const identity = await MobileVerify.findById(decoded.user);
    let id;
    if (identity == null) {
      throw new Error("Please first verify your identity");
    }

    let user;
    if (
      identity.mobileVerified != undefined &&
      identity.mobileVerified != "false" &&
      jwt.verify(identity.mobileVerified, "398234324").verify
    ) {
      user = await Users.findOne({ mobile: identity.mobileNo.slice(-12) });
    } else if (
      identity.emailVerified != undefined &&
      identity.emailVerified != "false" &&
      jwt.verify(identity.emailVerified, "398234324").verify
    ) {
      user = await Users.findOne({ email: new RegExp(identity.emailId, "i") });
    } else {
      throw new Error("Verify Otp first");
    }

    if (user == null || user == undefined) {
      throw new Error("Account not found");
    } else {
      if (req.body.password != req.body.repassword) {
        throw new Error("Password and repeat password must be matched");
      }
      user.password = req.body.password;
      const salt = await bcrypt.genSaltSync(10);
      user.password = await bcrypt.hash(req.body.password, salt);

      await user.save();
      await identity.deleteOne();
      res.data = {
        message: "success",
      };
      res.statusCode = "200";
      res.error = false;
      next();
    }
  } catch (error) {
    sendResponse(res, {}, error.message, 402, "");
  }
};
const UserStatusApprove = async (req, res) => {
  try {
    const User = await Users.findById(req.User);
    const role = await Role.findById(Users.role_id);
    if (role == null || role.slug != "admin") {
      throw new Error(
        "You don't have power to change the power of other employee"
      );
    }
    if (req.User == req.params.id) {
      throw new Error("You cannot access your self");
    }
    const newUser = await Users.findByIdAndUpdate(
      req.params.id,
      { is_approved: req.body.is_approved },
      { new: true }
    );
    sendResponse(res, newUser, "Status updated successfully", 200, "");
  } catch (error) {
    sendResponse(res, {}, error.message, 403, "");
  }
};

module.exports = {
  // User API'S
  addUser,
  loginUser,
  updateUserProfile,
  getUserProfile,

  // Admin API'S
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  FilterUsers,
  getUserById,
  updateUser,
  getAllUsers,

  // Admin and User API'S
  findUser,
  deleteUser,
  pagination,
  passwordChange,
  resetPassword,
  UserStatusApprove,
};
