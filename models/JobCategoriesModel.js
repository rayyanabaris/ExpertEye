const mongoose = require("mongoose");

const JobCategoriesSchema = mongoose.Schema(
  {
    category_code: {
      type: String,
      require: true,
    },
     category_name: {
      type: String,
      require: true,
    },
      category_color: {
      type: String,
    },
      category_description: {
      type: String,
    },
       meta_title: {
      type: String,
    },
       meta_description: {
      type: String,
    },
      meta_keyword: {
      type: String,
    },
      is_active: {
      type: Number,
      default: '1',
    },
  },
  {
    timestamps: true,
  }
);

JobCategoriesSchema.index({ title: "text" });

module.exports = mongoose.model("job_categories", JobCategoriesSchema);
