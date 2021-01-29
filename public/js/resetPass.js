const updatePassBtn = $("#resetformbtn");
const updatePass = $("#reset-password");

// When the signup button is clicked, we validate the email and password are not blank
const handlePassData = event => {
  event.preventDefault();

  const userData = {
    code: $("#code-input")
      .val()
      .trim(),
    password: $("#password-input")
      .val()
      .trim(),
    repassword: $("#repassword-input")
      .val()
      .trim()
  };

  if (!userData.password || !userData.repassword || !userData.code) {
    $("#thank-you-modal").show();
    $("#notification").text("Error");
    $("#response").text("Make sure All fields are filled in!!!");
    return;
  }

  if (userData.password !== userData.repassword) {
    $("#thank-you-modal").show();
    $("#notification").text("Error");
    $("#response").text("Password Didn't Match");
    return;
  }

  updatePassword(userData);
  $("#password-input").val("");
  $("#repassword-input").val("");
};

// Does a post to the signup route. If successful, we are redirected to the members page
// Otherwise we log any errors
function updatePassword(userData) {
  $.ajax("/api/reset-password", {
    type: "PUT",
    data: userData
  })
    .then(response => {
      console.log(response);
      $("#thank-you-modal").show();
      $("#notification").text("Updated Password");
      $("#response").text(response.message);

      setTimeout(() => {
        window.location.replace("/");
      }, 4000);

      // If there's an error, handle it by throwing up a bootstrap alert
    })
    .catch(() => {
      return {
        error: "error"
      };
    });
}

updatePass.on("submit", handlePassData);
updatePassBtn.on("click", handlePassData);
