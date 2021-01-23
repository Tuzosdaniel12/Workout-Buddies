const title = $("#nameOfTheWorkoutInput1")
  .val()
  .trim();
const category = $("#categoryInput1")
  .val()
  .trim();
const description = $("#exerciseprogramTextarea1")
  .val()
  .trim();
const CUBtn = $("#CUBtn");

CUBtn.on("click", event => {
  event.preventDefault();
  if (event.target.data("id")) {
    updateWO(event.target.data("id"));
  }
  createWO();
});

function createWO() {
  $.post("/api/workouts", {
    title: title,
    category: category,
    description: description
  }).then(() => {
    window.location.replace("/members");
  });
}

function updateWO(id) {
  $.put("/api/workouts/" + id, {
    title: title,
    category: category,
    description: description
  }).then(() => {
    window.location.replace("/members");
  });
}
