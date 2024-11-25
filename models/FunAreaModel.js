const mongoose = require("mongoose");

const FunAreasSchema = mongoose.Schema(
  {
    functional_area: {
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

FunAreasSchema.index({ title: "text" });

module.exports = mongoose.model("functional_areas", FunAreasSchema);
