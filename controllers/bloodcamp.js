const BloodCamp = require("../models/Blood_camp");
const Hospital = require("../models/Hospital");





module.exports.listCamps = async (req, res) => {
  try {
    const camps = await BloodCamp.find()
      .populate("Hospital", "name email mobile")
      .sort({ date: 1 }); 

    if (req.headers['x-client'] === 'React') {
      return res.json({ camps });
    }
    res.render("camps/index", { camps, user: req.user });
  } catch (err) {
    console.error("Error fetching blood camps:", err);
    req.flash("error", "Unable to fetch blood camps");
    res.redirect("/");
  }
};


module.exports.showCamp = async (req, res) => {
  try {
    const { id } = req.params;
    const camp = await BloodCamp.findById(id).populate("Hospital");

    if (!camp) {
      req.flash("error", "Blood camp not found");
      return res.redirect("/camps");
    }

    if (req.headers['x-client'] === 'React') {
      return res.json({ camp });
    }
    res.render("camps/show", { camp, user: req.user });
  } catch (err) {
    console.error("Error fetching camp:", err);
    req.flash("error", "Something went wrong");
    res.redirect("/camps");
  }
};





