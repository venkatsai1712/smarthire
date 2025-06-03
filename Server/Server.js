import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

const app = express();
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
  });

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, unique: true, required: true },
      role: { type: String, required: true },
    },
    { timestamps: true }
  )
);

const Job = mongoose.model(
  "Job",
  new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      skills: { type: [String], required: true },
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      city: { type: String },
      salary: { type: Number },
      experience: { type: String },
      type: { type: String },
    },
    { timestamps: true }
  )
);

const Applicant = mongoose.model(
  "Applicant",
  new mongoose.Schema(
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
      },
      applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      postedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    { timestamps: true }
  )
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "mysessionsecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: "lax", maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/sign-in/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: req.session.role,
          }).save();
          console.log("User Created: ", user);
        }
        return done(null, { ...profile, role: req.session.role, user });
      } catch (error) {
        console.error("Google Auth Error:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

app.get(
  "/sign-in/:role",
  (req, res, next) => {
    if (req.params.role === "recruiter" || req.params.role === "candidate") {
      req.session.role = req.params.role;
    }
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/sign-in/callback",
  passport.authenticate("google"),
  (err, req, res, next) => {
    req.session.save((error) => {
      if (err.name === "TokenError") {
        res.redirect("http://localhost:5173/google-sign-in");
      } else {
        res.status(400);
      }
      if (error) {
        console.log("Session Saving Error: " + error);
      }
    });
  }
);

app.get("/get-user-details", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("Authenticated User");
    res.json(req.user);
  } else {
    console.log("Not Authenticated User");
    res.status(401).json({ error: "Not Authenticated User" });
  }
});

app.post("/post-job", async (req, res) => {
  if (req.isAuthenticated() && req.user.role === "recruiter") {
    try {
      const result = await new Job({
        ...req.body,
        postedBy: req.user.user._id,
      }).save();
      console.log("Job Posted Successfully: ", result);
      res.status(201).json({
        message: "Job Posted Successfully",
      });
    } catch (error) {
      console.error("Error Posting Job: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
});

app.get("/get-jobs", async (req, res) => {
  if (req.isAuthenticated() && req.user.role === "candidate") {
    const result = await Job.find();
    res.json(result);
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
});

app.post("/apply-job", async (req, res) => {
  if (req.isAuthenticated() && req.user.role === "candidate") {
    const result = await new Applicant({
      jobId: req.body.jobId,
      applicantId: req.user.user._id,
      postedId: req.body.postedId,
    }).save();
    res.status(201).json({ message: "Job Applied" });
  }
});

app.get("/get-applicants", async (req, res) => {
  if (req.isAuthenticated() && req.user.role === "recruiter") {
    try {
      const result = await Applicant.find()
        .populate({
          path: "postedId",
          match: { _id: req.user.user._id },
        })
        .populate("applicantId")
        .populate("jobId");
      res.json(result);
    } catch (err) {
      console.log(err);
    }
  }
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((error) => {
      if (error) {
        return res.status(500);
      }
      res.clearCookie("connect.sid");
      res.json({message:"Success Logout"});
    });
  });
});

app.listen(port, () => {
  console.log("App Listening On Port: " + port);
});
