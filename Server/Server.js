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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/sign-in/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

app.use(
  session({
    secret: "mysessionsecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/sign-in/:role",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/sign-in/callback",
  passport.authenticate("google"),
  (err, req, res, next) => {
    if (err.name === "TokenError") {
      res.redirect("http://localhost:5173/dashboard");
    }
  }
);

app.get("/sign-in/failure", (req, res) => {
  res.send("Authentication Failure");
});

app.get("/get-user-details", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("Auth");
    res.json(req.user);
  } else {
    console.log("No Auth");
    res.status(401).json({error:"No auth"});
  }
});

app.listen(port, () => {
  console.log("App Listening On Port: " + port);
});
