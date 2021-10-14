const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: Number,
    require: true,
  },
  hasAtomicButton: {
    type: Boolean,
    require: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

articleSchema.virtual("satellite", {
  ref: "Satellite", 
  localField: "_id", 
  foreignField: "user", 
  justOne: false, 
});

module.exports = mongoose.model("User", userSchema);