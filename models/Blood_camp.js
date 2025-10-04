const mongoose = require('mongoose');
const Hospital = require('./Hospital');

const bloodCampSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  organizer: { type: String },
  Hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  address: { type: String, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
  date: { type: Date, required: true },
  timeFrom: { type: String, required: true },
  timeTo: { type: String, required: true },
  donorsNotified: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Donor' }
  ],
  createdAt: { type: Date, default: Date.now },
});

bloodCampSchema.index({ location: '2dsphere' }); // for geo queries

module.exports = mongoose.model('BloodCamp', bloodCampSchema);
