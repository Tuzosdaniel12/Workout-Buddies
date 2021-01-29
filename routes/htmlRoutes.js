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

router.get("/reset-password", (req, res) => {
  // If the user already has an account send them to the members page
  res.render("resetpass");
});

router.get("/create", (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  res.render("createOrUpdate", {
    action: "Create",
    title: "Title",
    description: "Description"
  });
});

router.get("/update/:id", async (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  console.log(req.params.id);

  const viewOne = await db.Workouts.findOne({
    where: { id: req.params.id }
  });

  res.render("createOrUpdate", {
    action: "Update",
    title: viewOne.dataValues.title,
    description: viewOne.dataValues.description
  });
});

router.get("/forgot-password", (req, res) => {
  res.render("activate", {
    action: "email",
    bool: false,
    target: "reset-password"
  });
});

router.get("/resend-activation", (req, res) => {
  res.render("activate", {
    action: "email",
    bool: false,
    target: "resend-activation"
  });
});

router.get("/activate", (req, res) => {
  res.render("activate", { action: "activate", bool: true });
});

router.get("/progress", async (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }

  const bmiRes = await db.BMI.findAll({
    where: { UserId: req.user.id },
    order: [["createdAt", "DESC"]]
  });

  const renderData = bmiRes.map(el => {
    return {
      bmi: el.dataValues.bmi,
      createdAt: el.dataValues.createdAt
        .toString()
        .split(" ")
        .slice(1, 4)
        .join(" ")
    };
  });

  const bmi = bmiRes[0].dataValues.bmi;
  const ft = Math.floor(req.user.height / 12);
  const inches = req.user.height % 12;
  res.render("progress", {
    renderData: renderData,
    name: req.user.name,
    bmi: bmi,
    weight: req.user.weight,
    age: req.user.age,
    height: `${ft} ' ${inches}`,
    message: "All Workouts!!"
  });
});

router.get("/updatestats", (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  res.render("updatestats", {
    action: "update stats",
    weight: req.user.weight,
    age: req.user.age
  });
});

router.get("/allworkouts", async (req, res) => {
  const workouts = await db.Workouts.findAll({
    include: [{ model: db.User }],
    order: [["createdAt", "DESC"]]
  }).catch(err => {
    res.json({ error: err });
  });

  const bmiRes = await db.BMI.findAll({
    where: { UserId: req.user.id },
    order: [["createdAt", "DESC"]]
  });

  const bmi = bmiRes[0].dataValues.bmi;
  const dataRender = workouts.map(workout => {
    return {
      id: workout.dataValues.id,
      title: workout.dataValues.title,
      category: workout.dataValues.category,
      name: workout.dataValues.User.name,
      bool: workout.dataValues.publicBoolean,
      description: workout.dataValues.description,
      author: workout.dataValues.User.name
    };
  });

  res.render("allworkouts", {
    workouts: dataRender,
    name: req.user.name,
    bmi: bmi,
    message: "All Workouts!!"
  });
});
// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/members", isAuthenticated, async (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  try {
    const results = await db.SavedWorkouts.findAll({
      where: { UserId: req.user.id },
      order: [["createdAt", "DESC"]],
      include: [
        { model: db.Workouts, include: [{ model: db.User }] },
        { model: db.User }
      ]
    });

    const bmiRes = await db.BMI.findAll({
      where: { UserId: req.user.id },
      order: [["createdAt", "DESC"]]
    });
    const bmi = bmiRes[0].dataValues.bmi;

    const workouts = results.map(workout => {
      return {
        id: workout.dataValues.id,
        bool: workout.dataValues.publicBoolean,
        title: workout.dataValues.Workout.title,
        category: workout.dataValues.Workout.category,
        name: workout.dataValues.User.name,
        description: workout.dataValues.Workout.description,
        author: workout.dataValues.Workout.User.name,
        updateId: workout.dataValues.Workout.id
      };
    });

    res.render("members", {
      workouts: workouts,
      name: req.user.name,
      bmi: bmi,
      message: "Welcome Back Buddie!!"
    });
  } catch (err) {
    return res.json({ messages: "Something wrong happen" });
  }
});

module.exports = router;
