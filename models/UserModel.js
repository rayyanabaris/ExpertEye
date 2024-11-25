const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    // Personal Details
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    resume: {
      type: String,
    },
    lang: {
      type: String,
    },

    // Profile Information
    role: {
      type: String,
      default: "user",
    },
    fatherName: {
      type: String,
    },
    date_of_Birth: {
      type: Date,
    },
    isImmediateAvailable: {
      type: Boolean,
    },
    numProfileViews: {
      type: Number,
    },

    // IDs
    gender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genders",
    },
    maritalStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Marital_statuses",
    },
    nationality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Countries",
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Countries",
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "States",
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cities",
    },
    streetAddress: {
      type: String,
    },
    jobExperience: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job_experiences",
    },
    careerLevel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career_levels",
    },
    industry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Industries",
    },
    functionalArea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Functional_areas",
    },
    jobSkills: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "job_skills",
    }],

    // Verification and Security
    isActive: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    provider: {
      type: String,
    },
    providerId: {
      type: String,
    },
    rememberToken: {
      type: String,
    },
    emailVerifiedAt: {
      type: Date,
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    nationalIdCardNumber: {
      type: String,
    },
    currentSalary: {
      type: Number,
    },
    expectedSalary: {
      type: Number,
    },
    salaryCurrency: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Check password match
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate password reset token
userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
  return resetToken;
};

module.exports = mongoose.model("users", userSchema);
