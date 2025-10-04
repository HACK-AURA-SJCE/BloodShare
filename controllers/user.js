const Auth = require("../models/Auth");
const Donor = require("../models/Donor");
const Hospital = require("../models/Hospital");
const Donation = require("../models/Donation");

module.exports.renderSignUpForm = (req, res) => {
  const role = req.query.role || "Donor";
  if (req.headers['x-client'] === 'React') {
    return res.json({ role, view: 'users/signup' });
  }
  res.render("users/signup", { role });
};


async function linkPastDonations(aadhar, donorId) {
  try {
    await Donation.updateMany(
      { aadhar, donor: { $exists: false } },
      { $set: { donor: donorId } }
    );
  } catch (err) {
    console.error("Error linking past donations:", err);
  }
}

module.exports.signup = async (req, res, next) => {
  const {
    name, email, mobile, password, role,
    bloodGroup, aadhar, permanentAddress,
    permanentLat, permanentLng,
    hospitalAddress, hospitalLat, hospitalLng
  } = req.body;

  let newUser;

  try {
    if (role === "Donor") {
      newUser = new Donor({
        name,
        email,
        mobile,
        bloodGroup,
        aadhar,
        permanentAddress,
        permanentLocation: {
          type: "Point",
          coordinates: [parseFloat(permanentLng) || 0, parseFloat(permanentLat) || 0]
        }
      });

      await newUser.save();


      await linkPastDonations(aadhar, newUser._id);

    } else if (role === "Hospital") {
      newUser = new Hospital({
        name,
        email,
        mobile,
        hospitalAddress,
        location: {
          type: "Point",
          coordinates: [parseFloat(hospitalLng) || 0, parseFloat(hospitalLat) || 0]
        }
      });

      await newUser.save();
    }


    const authUser = new Auth({ email, role, refId: newUser._id });
    const registeredUser = await Auth.register(authUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      if (req.headers['x-client'] === 'React') {
        return res.json({ success: true, user: { role, email }, profile: newUser });
      } else {
        if (role === "Donor") return res.redirect("/donor/dashboard");
        else return res.redirect("/hospital/dashboard");
      }
    });

  } catch (err) {
    console.error("Signup Error:", err);
    if (req.headers['x-client'] === 'React') {
      return res.status(500).json({ success: false, error: "Error creating account. Please try again." });
    }
    return res.render("signup", { error: "Error creating account. Please try again." });
  }
};

module.exports.renderLoginForm = (req, res) => {
  if (req.headers['x-client'] === 'React') {
    return res.json({ view: 'users/login' });
  }
  res.render("users/login");
};





module.exports.login = async (req, res) => {
  const { email } = req.body;

  const authUser = await Auth.findOne({ email });
  if (!authUser) {
    console.error("No user found with this email");
    if (req.headers['x-client'] === 'React') {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    return res.redirect("/login");
  }

  let profile;
  if (authUser.role === "Donor") {
    profile = await Donor.findById(authUser.refId);
    if (req.headers['x-client'] === 'React') {
      return res.json({ success: true, user: { role: 'Donor', email }, profile });
    }
    res.redirect("/donor/dashboard");
  } else {
    profile = await Hospital.findById(authUser.refId);
    if (req.headers['x-client'] === 'React') {
      return res.json({ success: true, user: { role: 'Hospital', email }, profile });
    }
    res.redirect("/hospital/dashboard");
  }
};


module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err)
      return next(err);
    if (req.headers['x-client'] === 'React') {
      return res.json({ success: true });
    }
    res.redirect("/login");
  });
};


module.exports.me = async (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ authenticated: false });
  }
  const { email, role, refId } = req.user;
  let profile = null;
  try {
    if (role === 'Donor') {
      profile = await require('../models/Donor').findById(refId);
    } else if (role === 'Hospital') {
      profile = await require('../models/Hospital').findById(refId);
    }
  } catch (e) { }
  return res.json({ authenticated: true, user: { email, role }, profile });
};



