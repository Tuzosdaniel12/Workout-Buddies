/* eslint-disable prettier/prettier */
$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  
});

const checkBmi = () =>{
  const value = parseInt($("#bmi").val());
  if(value <= 18){
    $("#bmi").css("background-color", "DeepSkyBlue");
  }else if(value >= 19 || value <= 25){
    $("#bmi").css("background-color", "LightGreen");
  }else if(value >= 26 || value <= 30){
    $("#bmi").css("background-color", "orange");
  }else{
    $("#bmi").css("background-color", "red");
  }
};

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
  case "view-workout" :
    let route = "";
    if(action === "view-workout"){
      route = "workouts/view";
    }else{
      route = "SavedWorkouts";
    }

    if(!($(this).data("bool"))){
      data.bool = 1;
      console.log("hit", data.bool);
    }
    data.current = $("#current-workout").data("id");
    $.ajax("/api/"+route+"/" + data.id, {
      type: "PUT",
      data: data
    }).then(() => {
      console.log("deleted workout", data.id);
  
      location.reload();
    });

    break;
  case "update" :
    //data.id
    window.location.replace("/update");
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
    console.log("focus");
    $(this).addClass("liked-workout");
    break;
  case "save" :
    $.ajax("/api/SavedWorkouts", {
      type: "POST",
      data:data
    }).then(() => {
      console.log("updated workout", data.id);
  
      window.location.replace("/");
    });
    break;
  }
}

checkBmi();
actionBtn.on("click", "[data-id]", handleBtnAction);
