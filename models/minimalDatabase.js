const mongoose = require('mongoose');

const minimalSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true 
  },
  city: {
    type: String,
    required: true 
  },
  disease: {
    type: String,
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now   
  }
});

module.exports = mongoose.model("Minimal", minimalSchema);

