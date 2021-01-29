const db = require("../models");
const router = require("express").Router();
const BMI = require("../util/bmi");
router.get("/api/bmi", (req, res) => {
  db.BMI.findOne({ where: { userID: req.body.userID } }).then(results => {
    res.json(results);
  });
});

router.put("/api/update/userstats", (req, res) => {
  console.log(req.body);
  db.Users.update(
    {
      height: req.body.height,
      weight: req.body.weight,
      age: req.body.age
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(results => {
    res.json(results);
  });
});

router.post("/api/bmi", (req, res) => {
  const bmiCal = new BMI();
  console.log(req.body);
  bmiCal
    .getRequest(
      req.body.userData.age,
      req.body.userData.weight * 0.453592,
      req.body.userData.height * 2.54
    )
    .then(bmi => {
      bmi = Math.floor(bmi);
      db.BMI.create({
        bmi: bmi,
        UserId: req.user.id
      }).then(results => {
        res.json(results);
      });
    });
});

module.exports = router;
