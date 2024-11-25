const mongoose = require("mongoose");

const CurrenciesSchema = mongoose.Schema(
  {
    currency: {
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

CurrenciesSchema.index({ title: "text" });

module.exports = mongoose.model("salary_currencies", CurrenciesSchema);
