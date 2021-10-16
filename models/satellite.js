const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const satelliteSchema = new Schema({
  sideNumber: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    require: true,
  },
  producer: {
    type: String,
    require: true,
  },
  softwareVersion: {
    type: String,
    require: true,
  },
  modelYear: {
    type: String,
    require: true,
  },
  dateOfLaunching: {
    type: Date,
    require: true,
  },
  amountOfAmmunition: {
    type: Number,
    require:true,
  },
  altitudeInOrbit: {
    type: Number,
    require:true,
  },
  hasAI: {
    type: Boolean,
    require: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  editDate:{
    type: Date,
    require: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Satellite", satelliteSchema);