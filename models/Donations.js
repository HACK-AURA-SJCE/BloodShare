const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor' },
  aadhar: { type: String, unique: true, required: true },        
  totalDonations: { type: Number, default: 0 },
  lastDonationDate: { type: Date },
  donationHistory: [
    {
      hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
      units: { type: Number, default: 1 },
       bloodGroup: { type: String },  
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Donation', donationSchema);


//TODO: required fields everywhere check