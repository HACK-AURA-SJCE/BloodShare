const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  hospitalAddress: { type: String },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  bloodStock: [
    {
      bloodGroup: String,
      units: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

hospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('Hospital', hospitalSchema);
