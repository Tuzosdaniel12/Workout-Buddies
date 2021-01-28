require("dotenv").config();
// Requiring our models and passport as we've configured it
const db = require("../models");
const router = require("express").Router();
const passport = require("../config/passport");
const CreateTokens = require("../util/CreateTokens");
const Mail = require("../config/mail.js");
const BMI = require("../util/bmi");

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
  const { name, email, password, height, weight, age, gender } = req.body;

  const dbUser = await db.User.findAll({
    where: {
      email: email
    }
  });

  if (dbUser.length >= 1) {
    res.json({ message: "User with email already exists." });
  }
  const bmiCal = new BMI();

  let bmi = await bmiCal
    .getRequest(age, weight * 0.453592, height * 2.54)
    .catch(() => {
      return res.json({ message: "Something Went wrongcome back later" });
    });
  bmi = Math.floor(bmi);

  await db.User.create({
    name: name,
    email: email,
    password: password,
    height: height,
    weight: weight,
    age: parseInt(age),
    gender: gender
  }).catch(() => {
    return res.json({ message: "something went wrong" });
  });

  const userId = await db.User.findAll({
    where: {
      email: email
    }
  }).catch(() => {
    return res.json({ message: "something went wrong" });
  });

  await db.BMI.create({
    bmi: bmi,
    UserId: userId[0].dataValues.id
  }).catch(err => {
    return res.status(401).json(err);
  });

  const Tokens = new CreateTokens();

  const key = await Tokens.key();

  await db.Tokens.create({
    token: await Tokens.sign(email),
    key: key
  }).catch(() => {
    return res.json({
      message: "error"
    });
  });

  const mail = new Mail();

  if (mail.sendMail(email, key, "activate")) {
    return res.json({
      message:
        "We created your account an Email has been sent, kindly activate your account"
    });
  }
  return res.json({
    message: "error"
  });
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
