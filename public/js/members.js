$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});

// 1). Create AJAX DELETE and SAVE REQUEST ?

$(".delete-workout").on("click", function(event) {
  event.preventDefault();
  const id = $(this).data("id");

  $.ajax("/api/SavedWorkouts/" + id, {
    type: "DELETE"
  }).then(() => {
    console.log("deleted workout", id);

    location.reload();
  });
});

// 2). Click event to go to update page green button
$(".update-page").on("click", function(event) {
  event.preventDefault();
  const id = $(this).data("id");

  window.location.replace("/update/workout/" + id);
});

// 6). click event to go to see all workout

$(".update-eye-open").on("click", function(event) {
  event.preventDefault();
  const data = { id: $(this).data("id") };
  if ($(this).data("publicBoolean")) {
    //zero is false
    data.publicBoolean = 0;
  } else {
    //one is true
    data.publicBoolean = 1;
  }
  $.put("/api/savedworkouts/update/boolean" + data.id, {
    data
  }).then(() => {
    window.location.replace("/members");
  });
});

$(".dropdown-toggle").on("click", e => {
  e.preventDefault();
  $(".dropdown-menu, #overlay").toggleClass("show");
});
