/* eslint-disable prettier/prettier */
$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});

const actionBtn = $("#action-buttons");
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

function handleBtnAction(e) {
  e.preventDefault();
  const data = { id: $(this).data("id") };
  const action = $(this).data("action");
  console.log($(this).data("action"));
  switch (action) {
  case "view" :
    console.log("here");
    if(!($(this).data("bool"))){
      data.bool = 1;
      console.log("hit", data.bool);
    }
    data.current = $("#current-workout").data("id");
    $.ajax("/api/SavedWorkouts/" + data.id, {
      type: "PUT",
      data: data
    }).then(() => {
      console.log("deleted workout", data.id);
  
      location.reload();
    });

    break;
  case "update" :
    //data.id
    window.location.replace("/update/" + data.id);
    break;
  case "delete" :
    $.ajax("/api/SavedWorkouts/" + data.id, {
      type: "DELETE"
    }).then(() => {
      console.log("deleted workout", data.id);
  
      location.reload();
    });
    break;
  case "like" :
    break;
  case "view-workout" :
    break;
  case "save" :
    $.ajax("/api/SavedWorkouts", {
      type: "POST",
      data:data
    }).then(() => {
      console.log("updated workout", data.id);
  
      location.reload();
    });
    break;
  }
}

actionBtn.on("click", "[data-id]", handleBtnAction);
