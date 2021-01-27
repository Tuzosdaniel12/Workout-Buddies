const db = require("../models");
const router = require("express").Router();
//routes by function/page controllers due query
//create workout userID:req.user.id
router.post("/api/workouts", (req, res) => {
  console.log("req.user.id", req.user.id);
  db.Workouts.create({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    UserId: req.user.id
  }).then(async ({ id }) => {
    console.log("HERE AMIGO", id);
    await db.SavedWorkouts.create({
      UserId: req.user.id,
      WorkoutId: id
    }).catch(() => {
      return res.json({
        error: "Something went wrong make sure to fill out all fields"
      });
    });
    return res.json({ success: "We added a new workout Buddie!!" });
  });
});
//read for all workouts
router.get("/api/workouts", (req, res) => {
  db.Workouts.findAll().then(results => {
    res.json(results);
  });
});
//read workouts based on category
router.get("/api/workouts/:category", (req, res) => {
  db.Workouts.findAll({ where: { category: req.params.category } }).then(
    results => {
      res.json(results);
    }
  );
});

//update personal workout
router.put("api/workouts/:id", (req, res) => {
  db.Workouts.update(
    {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category
    },
    { where: { id: req.params.id } }
  ).then(results => {
    res.json(results);
  });
});

module.exports = router;
