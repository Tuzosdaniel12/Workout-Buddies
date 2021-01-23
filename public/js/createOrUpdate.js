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
  console.log("test");
  event.preventDefault();
  console.log(event.target.data("id"));
  if (event.target.data("id")) {
    updateWO(event.target.data("id"));
  } else {
    console.log("creating");
    createWO();
  }
});

function createWO() {
  $.post("/api/workouts", {
    title: title,
    category: category,
    description: description
  }).then(() => {
    console.log(res);
    location.replace("/members");
  });
}

function updateWO(id) {
  $.put("/api/workouts/" + id, {
    title: title,
    category: category,
    description: description
  }).then(() => {
    location.replace("/members");
  });
}
