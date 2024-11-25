const mongoose = require("mongoose");

const CountriesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    nationality: {
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
  },
  {
    timestamps: true,
  }
);

CountriesSchema.index({ title: "text" });

module.exports = mongoose.model("Countries", CountriesSchema);
