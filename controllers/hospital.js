const Hospital = require("../models/Hospital");
const bloodTypes = require("../constants/bloodTypes"); 
const Emergency = require("../models/Emergency_notification");
const Donor = require("../models/Donor");


const BloodCamp = require("../models/Blood_camp");
const Donation = require("../models/Donation");
const Notification = require("../models/notification");


module.exports.viewStocks = async (req, res) => {
  const hospital = await Hospital.findById(req.user.refId);
  if (req.headers['x-client'] === 'React') {
    return res.json({ hospital });
  }
  res.render("hospital/viewStocks", { hospital });
};


module.exports.renderUpdateStock = async (req, res) => {
  const hospital = await Hospital.findById(req.user.refId);
  if (req.headers['x-client'] === 'React') {
    return res.json({ hospital, bloodTypes });
  }
  res.render("hospital/updateStock", { hospital, bloodTypes });
};


module.exports.updateStock = async (req, res) => { 
  const { bloodGroup, units } = req.body;
  const hospital = await Hospital.findById(req.user.refId);

  const existingStock = hospital.bloodStock.find(s => s.bloodGroup === bloodGroup);
  if (existingStock) {
    existingStock.units = units;
    existingStock.lastUpdated = new Date();
  } else {
    hospital.bloodStock.push({ bloodGroup, units });
  }

  await hospital.save();
  if (req.headers['x-client'] === 'React') {
    return res.json({ success: true, bloodStock: hospital.bloodStock });
  }
  res.redirect("/hospital/stocks");
};

module.exports.getEmergencyForm = (req, res) => {
  if (req.headers['x-client'] === 'React') {
    return res.json({ bloodTypes });
  }
  res.render("hospital/emergency", { bloodTypes });
};

module.exports.createEmergency = async (req, res) => {
  console.log("➡️ Entered createEmergency controller");

  const { bloodGroup, unitsNeeded, msg } = req.body;
  console.log("📥 Request body:", req.body);

  // Current hospital
  const hospital = await Hospital.findById(req.user.refId);
  if (!hospital) {
    console.log("❌ Hospital not found");
    return res.status(404).send("Hospital not found"); 
  }

  const emergency = new Emergency({
    bloodGroup,
    unitsNeeded,
    msg,
    hospital: hospital._id,
    hospitalLocation: hospital.location,
  });

  console.log("🆘 Emergency object prepared (not saved yet)");

  const nearbyDonors = await Donor.find({
    location: {
      $geoWithin: {
        $centerSphere: [hospital.location.coordinates, 5 / 6378.1],
      },
    },
    bloodGroup,
    active: true,
  });

 
  const nearbyHospitals = await Hospital.find({
    _id: { $ne: hospital._id },
    location: {
      $geoWithin: {
        $centerSphere: [hospital.location.coordinates, 5 / 6378.1],
      },
    },
  });

  console.log(
    `🧑‍🤝‍🧑 Nearby donors: ${nearbyDonors.length}, nearby hospitals: ${nearbyHospitals.length}`
  );

  emergency.donorsNotified = nearbyDonors.map((d) => d._id);
  emergency.hospitalsNotified = nearbyHospitals.map((h) => h._id);


  const notifications = [
    ...nearbyDonors.map((d) => ({
      recipientType: "Donor",
      recipientId: d._id,
      emergency: emergency._id,
    })),
    ...nearbyHospitals.map((h) => ({
      recipientType: "Hospital",
      recipientId: h._id,
      emergency: emergency._id,
    })),
  ];

  const createdNotifications = await Notification.insertMany(notifications);
  emergency.notifications = createdNotifications.map((n) => n._id);

  await emergency.save();
  console.log("💾 Emergency saved with notifications");

  if (req.headers['x-client'] === 'React') {
    return res.json({
      success: true,
      emergency,
      nearbyDonors,
      nearbyHospitals,
      bloodGroup,
    });
  }
  return res.render("hospital/emergencySuccess", {
    nearbyDonors,
    nearbyHospitals,
    emergency,
    bloodGroup,
  });
};


module.exports.dashboard = async (req, res) => {
  const hospital = await Hospital.findById(req.user.refId);

  if (!hospital) return res.redirect("/login");

  if (req.headers['x-client'] === 'React') {
    return res.json({ hospital });
  }
  res.render("hospital/dashboard", { hospital });
};



// const nearbyDonors = await Donor.find({
//   location: {
//     $geoWithin: {
//       $centerSphere: [ [hospitalLng, hospitalLat], 5 / 6378.1 ] // 5 km radius
//     }
//   }
// });


module.exports.renderBloodCampForm = async (req, res) => {
  const hospitalId = req.user.refId;
  const hospital = await Hospital.findById(hospitalId);

 
  const hospitalLat = hospital.location.coordinates[1];
  const hospitalLng = hospital.location.coordinates[0];

  if (req.headers['x-client'] === 'React') {
    return res.json({ hospitalLat, hospitalLng });
  }
  res.render("hospital/bloodcamp", {
    hospitalLat,
    hospitalLng,
    campLat: null,
    campLng: null
  });
};

module.exports.createBloodCamp = async (req, res) => {
  const { name, organizer, address, date, timeFrom, timeTo, latitude, longitude } = req.body;
  const hospitalId = req.user.refId;

  const bloodCamp = new BloodCamp({
    name,
    organizer,
    Hospital: hospitalId,
    address,
    date,
    timeFrom,
    timeTo,
    location: {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)]
    }
  });

  await bloodCamp.save();
  if (req.headers['x-client'] === 'React') {
    return res.json({ success: true, camp: bloodCamp });
  }
  res.redirect("/hospital/bloodcamp");
};




module.exports.addDonation = async (req, res) => {
  try {
    const { aadhar, bloodGroup, units } = req.body;
    const hospitalId = req.user.refId; 

    if (!aadhar || !bloodGroup) {
      console.log("Aadhar and blood group are required");
      return res.redirect("/hospital/donations");
    }

  
    const donor = await Donor.findOne({ aadhar });

   
    let donation = await Donation.findOne({ aadhar });

    if (donation) {
      
      donation.totalDonations += Number(units);
      donation.lastDonationDate = new Date();
      donation.donationHistory.push({
        hospital: hospitalId,
        units,
        bloodGroup,
      });

      if (donor && !donation.donor) {
        donation.donor = donor._id;
      }

      await donation.save();
    } else {
      
      donation = new Donation({
        aadhar,
        donor: donor ? donor._id : undefined,
        totalDonations: Number(units),
        lastDonationDate: new Date(),
        donationHistory: [{ hospital: hospitalId, units, bloodGroup }],
      });
      await donation.save();
    }

    const hospital = await Hospital.findById(hospitalId);
    let stock = hospital.bloodStock.find(s => s.bloodGroup === bloodGroup);

    if (stock) {
      stock.units += Number(units);
      stock.lastUpdated = new Date();
    } else {
      hospital.bloodStock.push({
        bloodGroup,
        units: Number(units),
        lastUpdated: new Date(),
      });
    }

    await hospital.save();

    console.log("Donation recorded successfully");
    res.redirect("/hospital/donations");
  } catch (err) {
    console.error("Error adding donation:", err);
    console.log("Failed to record donation");
    res.redirect("/hospital/donations");
  }
};

module.exports.listDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donor")
      .populate("donationHistory.hospital");

    if (req.headers['x-client'] === 'React') {
      return res.json({ donations, bloodTypes });
    }
    res.render("hospital/donations", { donations, user: req.user , bloodTypes });
  } catch (err) {
    console.error("Error fetching donations:", err);
    res.redirect("/hospital/dashboard");
  }
};





// Hospital incoming requests
module.exports.getHospitalRequests = async (req, res) => {
  const hospitalId = req.user.refId;

  const requests = await Notification.find({
    recipientType: "Hospital",
    recipientId: hospitalId,
    status: { $in: ["Pending", "Sent"] },
  })
    .populate("emergency")
    .populate({
      path: "emergency",
      populate: { path: "hospital", select: "name location" },
    });

  if (req.headers['x-client'] === 'React') {
    return res.json({ requests });
  }
  res.render("hospital/requests", { requests });
};

// Sent requests for a hospital
module.exports.getHospitalSentRequests = async (req, res) => {
  const hospitalId = req.user.refId;

  const emergencies = await Emergency.find({ hospital: hospitalId })
    .populate({
      path: "notifications",
      populate: { path: "recipientId", select: "name email location" },
    });

  if (req.headers['x-client'] === 'React') {
    return res.json({ emergencies });
  }
  res.render("hospital/sentRequests", { emergencies });
};


// Accept / Reject a notification
module.exports.updateNotificationStatus = async (req, res, next) => {
  try {
    const { id } = req.params; // notification ID
    const { action } = req.body; // "accept" or "reject"

    const notification = await Notification.findById(id).populate("emergency");
    if (!notification) return res.status(404).send("Notification not found");

    if (action === "accept") {
      notification.status = "Accepted";
      notification.sentAt = new Date();

      // mark emergency fulfilled
      await Emergency.findByIdAndUpdate(notification.emergency._id, {
        fulfilled: true,
      });

      // reject all other notifications for same emergency
      await Notification.updateMany(
        {
          emergency: notification.emergency._id,
          _id: { $ne: notification._id },
        },
        { $set: { status: "Rejected" } }
      );
    } else if (action === "reject") {
      notification.status = "Rejected";
    }

    await notification.save();
    if (req.headers['x-client'] === 'React') {
      return res.json({ success: true, status: notification.status });
    }
    return res.redirect("/hospital/dashboard"); // go back to request page
  } catch (err) {
    console.error("💥 Error updating notification:", err.message);
    return next(err);
  }
};

module.exports.getHospitalDash = async (req, res) => {
  try {
    const hospitalId = req.user.refId;
    const hospital = await Hospital.findById(hospitalId);

    // Stocks
    const stocks = hospital.bloodStock;

    // Sent requests (emergencies)
    const sentRequests = await Emergency.find({ hospital: hospitalId })
      .populate({
        path: "notifications",
        populate: { path: "recipientId", select: "name email" },
      });

    // Incoming requests
    const incomingRequests = await Notification.find({
      recipientType: "Hospital",
      recipientId: hospitalId,
      status: { $in: ["Pending", "Sent"] },
    })
      .populate("emergency")
      .populate({
        path: "emergency",
        populate: { path: "hospital", select: "name" },
      });

    // Donations
    const donations = await Donation.find()
      .populate("donor")
      .populate("donationHistory.hospital");

    // Blood camps
    const bloodCamps = await BloodCamp.find({ Hospital: hospitalId });

    if (req.headers['x-client'] === 'React') {
      return res.json({
        hospital,
        stocks,
        sentRequests,
        incomingRequests,
        donations,
        bloodCamps,
      });
    }
    res.render("hospital/hospitaldash", {
      hospital,
      stocks,
      sentRequests,
      incomingRequests,
      donations,
      bloodCamps,
    });
  } catch (err) {
    console.error("Error fetching hospital dash:", err);
    res.status(500).send("Error fetching hospital dash");
  }
};
