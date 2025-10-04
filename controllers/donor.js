const Donor = require("../models/Donor");
const Donation = require("../models/Donation");
const Notification = require("../models/notification");
const Emergency = require("../models/Emergency_notification");
const BloodCampNotification = require("../models/BloodCampNotification");
const BloodCamp = require("../models/Blood_camp");


module.exports.dashboard = async (req, res) => {
  res.redirect("/donor/donordash");
};

module.exports.getProfile = async (req, res) => {
  const donor = await Donor.findById(req.user.refId);
  if (!donor) {
    if (req.headers['x-client'] === 'React') {
      return res.status(404).json({ error: 'Donor not found' });
    }
    return res.redirect("/login");
  }

  if (req.headers['x-client'] === 'React') {
    return res.json({ donor });
  }
  res.render("donor/profile", { donor });
};

module.exports.toggleActive = async (req, res) => {
  try {
    const donor = await Donor.findById(req.user.refId);
    if (!donor) return res.status(404).json({ error: 'Donor not found' });

    donor.active = !donor.active;
    await donor.save();

    res.json({ active: donor.active });
  } catch (err) {
    console.error('Error toggling active status:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.updateLocation = async (req, res) => {
  const { latitude, longitude } = req.body;

  await Donor.findByIdAndUpdate(req.user.refId, {
    location: { type: 'Point', coordinates: [longitude, latitude] }
  });

  res.json({ status: 'Location updated' });
};



module.exports.donorHistory = async (req, res) => {
  try {
    const donorId = req.user.refId; 
    const donor = await Donor.findById(donorId);

    const donation = await Donation.findOne({ donor: donorId })
      .populate("donationHistory.hospital");

    if (req.headers['x-client'] === 'React') {
      return res.json({ donor, donation });
    }
    res.render("donor/history", { donor, donation });
  } catch (err) {
    console.error("Error fetching donor history:", err);
    res.redirect("/donor/dashboard");
  }
};




module.exports.getDonorRequests = async (req, res) => {
  const donorId = req.user.refId;

  const requests = await Notification.find({
    recipientType: "Donor",
    recipientId: donorId,
    status: { $in: ["Pending", "Sent"] },
  })
    .populate("emergency")
    .populate({
      path: "emergency",
      populate: { path: "hospital", select: "name location" },
    });
    console.log(requests);
  if (req.headers['x-client'] === 'React') {
    return res.json({ requests });
  }
  res.render("donor/requests", { requests });
};








module.exports.updateNotificationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { action } = req.body; 

    const notification = await Notification.findById(id).populate("emergency");
    if (!notification) return res.status(404).json({ error: "Notification not found" });

    if (action === "accept") {
      notification.status = "Accepted";
      notification.sentAt = new Date();

      await Emergency.findByIdAndUpdate(notification.emergency._id, {
        fulfilled: true,
      });

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
    return res.redirect('/donor/requests');
  } catch (err) {
    console.error("💥 Error updating notification:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};








module.exports.getNotifications = async (req, res) => {
  try {
    const donorId = req.user.refId; 
    console.log("Fetching notifications for donor:", donorId);
    const notifications = await BloodCampNotification.find({ donor: donorId })
      .populate("camp")
      .sort({ notifiedAt: -1 });
    console.log(notifications);
    if (req.headers['x-client'] === 'React') {
      return res.json({ notifications });
    }
    res.render("donor/campNoti", { notifications });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching notifications");
  }
};

module.exports.getEligibility = async (req, res) => {
  try {
    const donorId = req.user.refId;
    const donor = await Donor.findById(donorId);
    const donation = await require("../models/Donation").findOne({ donor: donorId });

    if (!donation) {
      const payload = { donor, totalDonations: 0, daysSinceLastDonation: "N/A", isEligible: true };
      if (req.headers['x-client'] === 'React') {
        return res.json(payload);
      }
      return res.render("donor/eligibility", payload);
    }

    const totalDonations = donation.totalDonations || 0;
    const lastDonationDate = donation.lastDonationDate;
    let daysSinceLastDonation = "N/A";
    let isEligible = true;

    if (lastDonationDate) {
      const now = new Date();
      const diffTime = Math.abs(now - lastDonationDate);
      daysSinceLastDonation = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
      isEligible = daysSinceLastDonation >= 90;
    }

    if (req.headers['x-client'] === 'React') {
      return res.json({ donor, totalDonations, daysSinceLastDonation, isEligible });
    }
    res.render("donor/eligibility", { donor, totalDonations, daysSinceLastDonation, isEligible });
  } catch (err) {
    console.error("Error fetching eligibility:", err);
    res.status(500).send("Error fetching eligibility");
  }
};

module.exports.getDonorDash = async (req, res) => {
  try {
    const donorId = req.user.refId;
    const donor = await Donor.findById(donorId);
    const donation = await Donation.findOne({ donor: donorId }).populate("donationHistory.hospital");

    let totalDonations = 0;
    let daysSinceLastDonation = "N/A";
    let isEligible = true;
    if (donation) {
      totalDonations = donation.totalDonations || 0;
      const lastDonationDate = donation.lastDonationDate;
      if (lastDonationDate) {
        const now = new Date();
        const diffTime = Math.abs(now - lastDonationDate);
        daysSinceLastDonation = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        isEligible = daysSinceLastDonation >= 90;
      }
    }


    const requests = await Notification.find({
      recipientType: "Donor",
      recipientId: donorId,
      status: { $in: ["Pending", "Sent"] },
    })
      .populate("emergency")
      .populate({
        path: "emergency",
        populate: { path: "hospital", select: "name" },
      });


    const camps = await BloodCamp.find({}).sort({ date: 1 });

    if (req.headers['x-client'] === 'React') {
      return res.json({
        donor,
        totalDonations,
        daysSinceLastDonation,
        isEligible,
        requests,
        donation,
        camps,
      });
    }
    res.render("donor/donordash", {
      donor,
      totalDonations,
      daysSinceLastDonation,
      isEligible,
      requests,
      donation,
      camps,
    });
  } catch (err) {
    console.error("Error fetching donor dash:", err);
    res.status(500).send("Error fetching donor dash");
  }
};


module.exports.generateNotifications = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);
    sevenDaysLater.setHours(23, 59, 59, 999);

    const camps = await BloodCamp.find({
      date: { $gte: today, $lte: sevenDaysLater }
    });
    console.log("Camps found for notification:", camps.length);
    for (let camp of camps) {
 
      const donors = await Donor.find({
        location: {
          $near: {
            $geometry: camp.location,
            $maxDistance: 10000
          }
        }
      });
      console.log(`Donors found near camp ${camp._id}:`, donors.length);
      for (let donor of donors) {
        try {
          await BloodCampNotification.updateOne(
            { camp: camp._id, donor: donor._id },
            { $setOnInsert: { camp: camp._id, donor: donor._id } },
            { upsert: true }
          );
        } catch (err) {
          if (err.code !== 11000) console.error("Error inserting notification:", err);
        }
      }
    }
  } catch (err) {
    console.error("Error generating notifications:", err);
  }
};
