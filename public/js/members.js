$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});

// 1). Create AJAX DELETE and SAVE REQUEST ?
$(function () {

  $(".delete-workout").on("click", function (event) {
    var id = $(this).data("id");


    $.ajax("/api/members/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted workout", id);

        location.reload();
      }
    );
  });

  // 2). Click event to go to update page 
  $(".update-page").on("click", function (event) {
    var id = $(this).data("id");
    var newWorkout = $(this).data("newworkout");

    var newWorkout = {
      workout: newWorkout
    };
  });

    // or we could use 
    // $(document).ready(function() {
    //   // RELOAD PAGE ON BUTTON CLICK EVENT.
    //     $('#update_page').click(function () {
    //         location.update(true); 
    //     });
    // });

    // 3). Click event to go to create page

    $(".create-newpage").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newPage = {
        name: $("#newpage").val().trim(),
        newPage: $("[name=newpage]:page").val().trim()
      };
    });
  

    // 4). click event to go see progress of bmi



    // 5). click event to go to update stats page

    $(".update-stats-page").on("click", function (event) {
      var id = $(this).data("id");
      var newStats = $(this).data("newstats");

      var newStats = {
        stats: newStats
      };
    });

      // 6). click event to go to see all workout




      // 7). Get route to see workout in display box, send in id


      app.get("/api/members/:id", function (req, res) {

        db.workout_buddies_db.findWorkout({
          where: {
            id: req.params.id
          }
        }).then(function (workout_buddies_db) {
          res.json(workout_buddies_db);
        });
      });


    });
$(".dropdown-toggle").on("click", e => {
  e.preventDefault();
  $(".dropdown-menu, #overlay").toggleClass("show");
});
