const mongoose = require("mongoose");

const CompaniesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  ceo: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  no_of_offices: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
    required: true,
    trim: true,
  },
  no_of_employees: {
    type: Number,
  },
  established_in: {
    type: String,
    trim: true,
  },
  fax: {
    type: Number,
  },
  phone: {
    type: Number,
    required: true,
  },
  logo: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    trim: true,
  },
  is_active: {
    type: String,
    required: true,
    default: "0",
  },
  is_featured: {
    type: String,
    required: true,
    default: "0",
  },
  ownership_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "ownership_types",
  },
  industry_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "industries",
  },
  country_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Countries",
  },
  state_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "States",
  },
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Cities",
  },
  map: {
    type: String,
    trim: true,
  },
  facebook: {
    type: String,
    trim: true,
  },
  twitter: {
    type: String,
    trim: true,
  },
  linkedin: {
    type: String,
    trim: true,
  },
  google_plus: {
    type: String,
    trim: true,
  },
  pinterest: {
    type: String,
    trim: true,
  },
  package_id: {
    type: String,
    trim: true,
  },
  package_start_date: {
    type: String,
    trim: true,
  },
  package_end_date: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

CompaniesSchema.index({ name: "text" });

module.exports = mongoose.model("companies", CompaniesSchema);
