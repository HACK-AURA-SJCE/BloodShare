const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  bloodGroup: { type: String, required: true },
  aadhar: { type: String, unique: true },

  // Current location (for real-time use/emergencies)
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },

  
  permanentLocation: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }, 
  },

  active: { type: Boolean, default: true },
  lastVerified: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

donorSchema.index({ location: '2dsphere' });
donorSchema.index({ permanentLocation: '2dsphere' });

module.exports = mongoose.model('Donor', donorSchema);
