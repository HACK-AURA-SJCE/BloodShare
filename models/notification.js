const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  recipientType: { 
    type: String, 
    enum: ["Donor", "Hospital"], 
    required: true 
  },
  recipientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    refPath: "recipientType" 
  },
  emergency: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Emergency", 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["Pending", "Sent", "Failed","Accepted", "Rejected"], 
    default: "Pending" 
  },
  message: { 
    type: String, 
    default: "Urgent blood requirement in your area" 
  },
  sentAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);
