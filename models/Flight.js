const { Timestamp, Int32 } = require('mongodb');
const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flightName: {
    type: String,
    required: true
  },
  flightCid: {
    type: Number,
    required: true
  },
  From: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  time: {
    type:String
  },
  dateOfJourney: {
    type: Date,
    required: true
  },
  seats: {
    type: Number
  },
  flightPrice: {
    type: Number,
    required: true
  }
});

module.exports = Flight = mongoose.model('flight', FlightSchema);