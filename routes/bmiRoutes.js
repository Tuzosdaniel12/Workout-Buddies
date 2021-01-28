const db = require("../models");
const router = require("express").Router();

router.get("/api/bmi", (req, res) => {
  db.BMI.findOne({ where: { userID: req.body.userID } }).then(results => {
    res.json(results);
  });
});

router.post("/api/bmi", (req, res) => {
  db.BMI.create({
    bmi: req.body.bmi,
    UserId: req.user.id
  }).then(results => {
    res.json(results);
  });

  // db.User.create({
  //   name: name,
  //   email: email,
  //   password: password,
  //   height: height,
  //   weight: weight,
  //   age: parseInt(age),
  //   gender: gender
  // }).catch(err => {
  //   return res.status(401).json(err);
  // });
});

module.exports = router;
