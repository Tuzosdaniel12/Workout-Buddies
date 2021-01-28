const updatestatsBtn = $("#updatestatsformbtn");
const updatestats = $("#updatestats");

// When the signup button is clicked, we validate the email and password are not blank
const handleUserData = event => {
  event.preventDefault();
  console.log("hit");
  const userData = {
    weight: parseInt(
      $("#weight-input")
        .val()
        .trim()
    ),
    age: parseInt(
      $("#age-input")
        .val()
        .trim()
    ),
    height:
      parseInt($("#feet option:selected").val()) * 12 +
      parseInt($("#inches option:selected").val())
  };

  if (!userData.weight || !userData.age || !userData.height) {
    $("#thank-you-modal").show();
    $("#notification").text("Error");
    $("#response").text("Make sure All fields are filled in!!!");
    return;
  }
  console.log(userData);

  updateUpUser(userData);
  $("#age-input").val("");
  $("#weight-input").val("");
};

// Does a post to the signup route. If successful, we are redirected to the members page
// Otherwise we log any errors
function updateUpUser(userData) {
  $.put("/api/update/userstats", userData)
    .then(response => {
      console.log(response);
      $("#thank-you-modal").show();
      $("#notification").text("Updated Stats");
      $("#response").text(response.message);

      setTimeout(() => {
        window.location.replace("/activate");
      }, 4000);

      // If there's an error, handle it by throwing up a bootstrap alert
    })
    .catch(() => {
      return {
        error: "error"
      };
    });
}

updatestats.on("submit", handleUserData);
updatestatsBtn.on("click", handleUserData);
