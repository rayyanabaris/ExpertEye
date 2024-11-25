const mongoose = require("mongoose");

const MaritalStatusSchema = mongoose.Schema(
  {
    marital_status: {
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

MaritalStatusSchema.index({ title: "text" });

module.exports = mongoose.model("marital_statuses", MaritalStatusSchema);
