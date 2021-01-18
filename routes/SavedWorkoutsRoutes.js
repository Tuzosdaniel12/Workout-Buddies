const db = require("../models");
const router = require("express").Router();

//read for homepage
router.get("/api/SavedWorkouts/:id", (req, res) => {
  db.SavedWorkouts.findAll({ where: { userID: req.params.id } }).then(
    results => {
      res.json(results);
    }
  );
});

router.delete("/api/SavedWorkouts/:id", (req, res) => {
  db.workouts.destroy({ where: { id: req.params.id } }).then(results => {
    res.json(results);
  });
});
module.exports = router;
