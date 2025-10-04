const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewear.js");
const authController = require("../controllers/user.js");



router.get("/home", (req, res) => {
  res.render("users/home");   // looks for views/users/home.ejs
});


// Simple authentication middleware
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

router.route("/signup")
  .get(authController.renderSignUpForm)
  .post(
    saveRedirectUrl,
    wrapAsync(authController.signup)
  );



router.route("/login")
  .get(authController.renderLoginForm)
  .post((req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        if (req.headers['x-client'] === 'React') {
          return res.json({ success: false, error: 'Invalid credentials' });
        } else {
          return res.redirect('/login');
        }
      }
      req.logIn(user, async (err) => {
        if (err) return next(err);
        if (req.headers['x-client'] === 'React') {
          let profile = null;
          try {
            if (user.role === 'Donor') {
              profile = await require('../models/Donor').findById(user.refId);
            } else if (user.role === 'Hospital') {
              profile = await require('../models/Hospital').findById(user.refId);
            }
          } catch (e) { }
          return res.json({ success: true, user: { role: user.role, email: user.email }, profile });
        } else {
          // Call the controller for redirect
          return authController.login(req, res);
        }
      });
    })(req, res, next);
  });


router.get("/logout", isAuthenticated, authController.logout);




router.get("/register-donor", (req, res) => res.render("users/signup", { role: "Donor" }));
router.get("/register-hospital", (req, res) => res.render("users/signup", { role: "Hospital" }));

module.exports = router;