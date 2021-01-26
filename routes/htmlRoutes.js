const router = require("express").Router();
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }

  res.render("index");
});

router.get("/signup", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  res.render("signup");
});

router.get("/create", (req, res) => {
  res.render("createOrUpdate", {
    action: "Create",
    title: "Title",
    description: "Description"
  });
});

router.get("/update/workout/:id", async (req, res) => {
  const viewOne = await db.Workouts.findOne({
    where: { id: req.params.id }
  });

  const renderData = {
    viewOne: viewOne,
    action: "Update"
  };

  res.render("createOrUpdate", renderData);
});

router.get("/activate", (req, res) => {
  res.render("activate");
});
// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/members", isAuthenticated, async (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }

  // const viewOne = await db.SavedWorkouts.findOne({
  //   where: { publicBoolean: 1 }
  // });

  //const results = await db.SavedWorkouts.findAll({
  //   where: { UserId: req.params.id },
  //   include: [{ model: db.Workouts }]
  // });
  // const renderData = {
  //   bmi: req.user.bmi,
  //   workouts: results,
  //   title: viewOne[0].dataValues.title,
  //   category: viewOne[0].dataValues.category,
  //   name: viewOne[0].dataValues.name,
  //   description: viewOne[0].dataValues.description
  // };

  res.render("members");
});

module.exports = router;
