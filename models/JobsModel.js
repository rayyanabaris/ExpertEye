const mongoose = require("mongoose");

const JobsSchema = mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    jobDescription: {
      type: String,
      trim: true,
      index: true,
    },
    jobBenefits: {
      type: String,
      trim: true,
      index: true,
    },
    jobSkills: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobSkills",
      required: true,
      index: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Countries",
      required: true,
      index: true,
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "States",
      required: true,
      index: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cities",
      required: true,
      index: true,
    },
    careerLevel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CareerLevels",
      required: true,
      index: true,
    },
    functionalArea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FunctionalAreas",
      required: true,
      index: true,
    },
    jobType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobTypes",
      required: true,
      index: true,
    },
    jobShift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobShifts",
      required: true,
      index: true,
    },
    degreeLevel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DegreeLevels",
      required: true,
      index: true,
    },
    experience: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobExperiences",
      required: true,
      index: true,
    },
    salary: {
      from: {
        type: Number,
        required: true,
        index: true,
      },
      to: {
        type: Number,
        required: true,
        index: true,
      },
      currency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SalaryCurrencies",
        required: true,
        index: true,
      },
      period: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SalaryPeriods",
        required: true,
        index: true,
      },
      hide: {
        type: Boolean,
        default: false,
        index: true,
      },
    },
    positions: {
      type: Number,
      default: 1,
      required: true,
      index: true,
    },
    expiryDate: {
      type: Date,
      required: true,
      index: true,
    },
    isFreelance: {
      type: Boolean,
      default: false,
      required: true,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

JobsSchema.index({ jobTitle: "text" });
JobsSchema.index({ location: "text" });
JobsSchema.index({ salary: "text" });

module.exports = mongoose.model("Jobs", JobsSchema);
