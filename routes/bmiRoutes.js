const db = require("../models");
const router = require("express").Router();

router.get("/api/bmi", (req, res) => {
  db.BMIs.findOne({ where: { userID: req.body.userID } }).then(results => {
    res.json(results);
  });
});

router.post("/api/bmi", (req, res) => {
  db.BMIs.create({
    UserId: req.user.id
  }).then(results => {
    res.json(results);
  });
});

module.exports = router;
