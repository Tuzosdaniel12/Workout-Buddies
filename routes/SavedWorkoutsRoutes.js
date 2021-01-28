const db = require("../models");
const router = require("express").Router();

//read for homepage
router.get("/api/SavedWorkouts/:id", (req, res) => {
  db.SavedWorkouts.findAll({
    where: { userID: req.params.id },
    include: [{ model: workouts }]
  }).then(results => {
    res.json(results);
  });
});

router.put("/api/SavedWorkouts/:id", (req, res) => {
  console.log(req.user);

  db.SavedWorkouts.update(
    {
      publicBoolean: req.body.bool
    },
    { where: { id: req.params.id } }
  ).then(results => {
    console.log(results);
    if (req.body.current) {
      db.SavedWorkouts.update(
        {
          publicBoolean: 0
        },
        { where: { id: req.body.current } }
      ).then(r => {
        console.log(r);
        res.json({ success: "Change what you are viewing" });
      });
    } else {
      return res.json({ success: "Change what you are viewing" });
    }
  });
});

router.delete("/api/SavedWorkouts/:id", (req, res) => {
  db.SavedWorkouts.destroy({ where: { id: req.params.id } }).then(results => {
    res.json(results);
  });
});

router.post("/api/SavedWorkouts", (req, res) => {
  console.log("Hit");
  db.SavedWorkouts.create({
    UserId: req.user.id,
    WorkoutId: req.body.id
  }).then(() => {
    res.json({ success: "saved workout" });
  });
});
module.exports = router;
