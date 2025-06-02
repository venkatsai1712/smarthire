import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;

const app = express();

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
    (req, accessToken, refreshToken, profile, done) => {
      return done(null, { ...profile, role: req.session.role });
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
      }
      if (error) {
        console.log("Session Saving Error: " + error);
      }
    });
  }
);

app.get("/sign-in/failure", (req, res) => {
  res.send("Authentication Failure");
});

app.get("/get-user-details", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("Authenticated User");
    res.json(req.user);
  } else {
    console.log("Not Authenticated User");
    res.status(401).json({ error: "Not Authenticated User" });
  }
});

app.listen(port, () => {
  console.log("App Listening On Port: " + port);
});
