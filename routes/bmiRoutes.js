const db = require("../models");
const router = require("express").Router();

router.get("/api/bmi", (req, res) => {
  db.BMI.findOne({ where: { userID: req.body.userID } }).then(results => {
    res.json(results);
  });
});

module.exports = router;
