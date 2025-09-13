const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  City: {
    type: String,
    required: true 
  },
  Disease: {
    type: String,
    required: true 
  },
  Cases: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now   
  }
});

// Explicitly tell Mongoose to use the 'diseases' collection
module.exports = mongoose.model("Disease", diseaseSchema, "diseases");
