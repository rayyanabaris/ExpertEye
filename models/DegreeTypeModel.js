const mongoose = require("mongoose");

const DegreeTypeSchema = mongoose.Schema(
  {
    degree_type: {
      type: String,
      required: true,
    },
    degree_level_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Degree_level"
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

DegreeTypeSchema.index({ title: "text" });

module.exports = mongoose.model("degree_types", DegreeTypeSchema);
