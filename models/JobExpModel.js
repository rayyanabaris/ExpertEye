const mongoose = require("mongoose");

const JobExpSchema = mongoose.Schema(
  {
    job_experience: {
      type: String,
      required: true,
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

JobExpSchema.index({ title: "text" });

module.exports = mongoose.model("job_experiences", JobExpSchema);
