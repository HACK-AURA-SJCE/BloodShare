// app.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const MongoStore = require("connect-mongo");
const cors = require("cors");

// Routes
const userRoutes = require("./routes/user");
const hospitalRoutes = require("./routes/hospital");
const donorRoutes = require("./routes/donor");
const bloodCampRoutes = require("./routes/bloodcamp");

// Models
const Auth = require("./models/Auth");

const dbUrl = "mongodb://127.0.0.1:27017/BloodShare";

// Connect to MongoDB
mongoose.connect(dbUrl)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

// View Engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// CORS for React frontend
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // your React dev servers
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-client']
}));

// Session store with dev secret
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: { secret: "mysecretoption" }, // dev secret for encrypting sessions
  touchAfter: 24 * 3600
});

store.on("error", err => console.log("Mongo Store Error:", err));

app.use(session({
  store,
  secret: "mysecretoption", // must match crypto secret
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true }
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: 'email' }, Auth.authenticate()));
passport.serializeUser(Auth.serializeUser());
passport.deserializeUser(Auth.deserializeUser());

// Current user middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", userRoutes);
app.use("/api", userRoutes);
app.use("/hospital", hospitalRoutes);
app.use("/donor", donorRoutes);
app.use("/camps", bloodCampRoutes);

// 404 Handler
app.use((req, res) => res.status(404).send("Page Not Found"));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(1000, () => console.log("Server started at port 1000"));
