const updateBtn = $("#updatestatsformbtn");
const BMI = require("../util/bmi");

updateBtn.on("click", event => {
  event.preventDefault();
  const weightInput = $("#weight-input");
  const ageInput = $("#age-input");
  const heightInput = $("#feet") * 12 + $("#inches");

  const bmiCal = new BMI();

  let bmi = bmiCal.getRequest(
    ageInput,
    weightInput * 0.453592,
    heightInput * 2.54
  );
  bmi = Math.floor(bmi);

  $.post("/api/bmi", {
    bmi: bmi
  }).then(() => {
    window.location.replace("/progress");
  });
});
