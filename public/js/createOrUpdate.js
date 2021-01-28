$(document).ready(() => {
  const CUBtn = $("#CUBtn");
  CUBtn.on("click", event => {
    event.preventDefault();
    const titleInput = $("#nameOfTheWorkoutInput1")
      .val()
      .trim();
    const categoryInput = $("#categoryInput1")
      .val()
      .trim();
    const descriptionInput = $("#exerciseprogramTextarea1")
      .val()
      .trim();
    if (event.target.getAttribute("data-action") === "Update") {
<<<<<<< HEAD
      console.log("updating");
      console.log(event.target.getAttribute("data-action"));
=======
>>>>>>> e4c83ea22b560f8c0b8ab65834ee466d7312283c
      updateWO(
        event.target.getAttribute("data-id"),
        titleInput,
        categoryInput,
        descriptionInput
      );
    } else if (event.target.getAttribute("data-action") === "Create") {
      console.log("creating");
      console.log(event.target.getAttribute("data-action"));
      createWO(titleInput, categoryInput, descriptionInput);
    }
  });

  function createWO(titleInput, categoryInput, descriptionInput) {
    $.post("/api/workouts", {
      title: titleInput,
      category: categoryInput,
      description: descriptionInput
    }).then(() => {
      window.location.replace("/members");
    });
  }

  function updateWO(id, titleInput, categoryInput, descriptionInput) {
    $.put("/api/workouts/" + id, {
      title: titleInput,
      category: categoryInput,
      description: descriptionInput
    }).then(() => {
      window.location.replace("/members");
    });
  }
});
