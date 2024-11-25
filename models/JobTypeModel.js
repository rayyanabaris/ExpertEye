const mongoose = require("mongoose");

const JobTypeSchema = mongoose.Schema(
  {
    job_type: {
      type: String,
      require: true,
    },
    is_default: {
      type: Number,
      default: '0',
    },
    is_active: {
      type: Number,
      default: '0',
    },
    sort_order: {
      type: Number,
      default: '0',
    },
    lang: {
      type: String,
      required: true,
    }, 
  },
  {
    timestamps: true,
  }
);

JobTypeSchema.index({ title: "text" });

module.exports = mongoose.model("Job_types", JobTypeSchema);
