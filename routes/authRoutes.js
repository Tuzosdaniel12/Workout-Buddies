require("dotenv").config();
// Requiring our models and passport as we've configured it
const db = require("../models");
const router = require("express").Router();
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN;

//auth user emali before making an account
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: DOMAIN
});

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), (req, res) => {
  // Sending back a password, even a hashed password, isn't a good idea
  res.json({
    email: req.user.email,
    id: req.user.id
  });
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", async (req, res) => {
  const dbUser = await db.User.findAll({
    where: {
      email: req.body.email
    }
  });

  if (dbUser) {
    res.status(400).json("User with email already exists.");
  }
  const token = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5min"
  });

  const data = {
    from: "noreply@workingoutbuddies",
    to: req.body.email,
    subject: "Account Activation Link",
    text:
      "<h2>please click on link to activate your account</h2><p>http://localhost:/8080/authentication/activate/" +
      token +
      "</p><p>expires in five minutes</p>"
  };
  mg.messages().send(data, error => {
    if (error) {
      return res.json({
        error: err.message
      });
    }
    return res.json({
      message: "Email has been sent, kindly activate your account"
    });
  });
});

router.post("/authentication/activate/", (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          return res.status(400).res.json({
            error: "Incorrect or Expired Link"
          });
        }
        const { email, password, height, weight } = decodedToken;

        await db.User.create({
          email: email,
          password: password,
          height: height,
          weight: weight
          // emailBoolean: req.body.emailBoolean
        }).catch(err => {
          res.status(401).json(err);
        });

        res.redirect(307, "/api/login");
      }
    );
  }
});

// Route for logging user out
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

module.exports = router;
