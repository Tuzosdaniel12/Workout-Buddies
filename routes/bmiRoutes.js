const db = require("../models");
const router = require("express").Router();
const BMI = require("../util/bmi");
router.get("/api/bmi", (req, res) => {
  db.BMI.findOne({ where: { userID: req.body.userID } }).then(results => {
    res.json(results);
  });
});

router.put("/api/update/userstats", (req, res) => {
  db.Users.update(
    {
      height: req.body.height,
      weight: req.body.weight,
      age: req.body.age
    },
    {
      where: {
        id: req.user.id
      }
    }
  ).then(results => {
    res.json(results);
  });
});

router.post("/api/bmi", (req, res) => {
  const bmiCal = new BMI();

  let bmi = bmiCal.getRequest(
    req.body.age,
    req.body.weight * 0.453592,
    req.body.height * 2.54
  );
  bmi = Math.floor(bmi);
  db.BMI.create({
    bmi: bmi,
    UserId: req.user.id
  }).then(results => {
    res.json(results);
  });
});

module.exports = router;
