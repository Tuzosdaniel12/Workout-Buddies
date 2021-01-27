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

router.get("/update/:id", (req, res) => {
  // const viewOne = await db.Workouts.findOne({
  //   where: { id: req.params.id }
  // });

  // const renderData = {
  //   viewOne: viewOne,
  //   action: "Update"
  // };

  res.render("createOrUpdate", {
    action: "Update",
    title: "Title",
    description: "Description"
  });
});

router.get("/activate", (req, res) => {
  res.render("activate");
});

router.get("/progress", (req, res) => {
  res.render("progress");
});

router.get("/updatestats", (req, res) => {
  res.render("updatestats");
});

router.get("/allworkouts", async (req, res) => {
  const workouts = await db.Workouts.findAll({
    include: [{ model: db.User }]
  }).catch(err => {
    res.json({ error: err });
  });
  const dataRender = workouts.map(workout => {
    return {
      id: workout.dataValues.id,
      title: workout.dataValues.title,
      category: workout.dataValues.category,
      name: workout.dataValues.User.name,
      description: workout.dataValues.description,
      author: workout.dataValues.User.name
    };
  });

  res.render("allworkouts", {
    workouts: dataRender
  });
});
// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/members", isAuthenticated, async (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  const results = await db.SavedWorkouts.findAll({
    where: { UserId: req.user.id },
    include: [
      { model: db.Workouts, include: [{ model: db.User }] },
      { model: db.User }
    ]
  });
  console.log(results);
  const workouts = results.map(workout => {
    return {
      id: workout.dataValues.id,
      bool: workout.dataValues.publicBoolean,
      title: workout.dataValues.Workout.title,
      category: workout.dataValues.Workout.category,
      name: workout.dataValues.User.name,
      description: workout.dataValues.Workout.description,
      author: workout.dataValues.Workout.User.name
    };
  });

  res.render("members", {
    workouts: workouts,
    name: results[0].dataValues.User.name
  });
});

module.exports = router;
