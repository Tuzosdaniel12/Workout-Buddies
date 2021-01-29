$(document).ready(() => {
  const CUBtn = $("#CUBtn");
  const action = $("#CUBtn").data("action");
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
      updateWO(
        event.target.getAttribute("data-id"),
        titleInput,
        categoryInput,
        descriptionInput
      );
    } else {
      console.log("creating");
      console.log(action);
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
    $.ajax({
      url: "/api/workouts/" + id,
      data: {
        title: titleInput,
        category: categoryInput,
        description: descriptionInput
      },
      method: "PUT"
    }).then(() => {
      window.location.replace("/members");
    });
  }
});
