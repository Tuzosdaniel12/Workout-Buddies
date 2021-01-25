$(document).ready(() => {
  // Getting references to our form and input
  const formBtn = $("#signupformbtn");
  const singupForm = $("#signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  const handleUserData = event => {
    event.preventDefault();
    console.log("hit");
    const userData = {
      name: $("#name-input")
        .val()
        .trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      repassword: $("#repassword-input")
        .val()
        .trim(),
      gender: $("#gender-input")
        .val()
        .trim(),
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
    if (userData.password !== userData.repassword) {
      return;
    }

    if (!userData.email || !userData.password) {
      return;
    }
    console.log(userData);
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    emailInput.val("");
    passwordInput.val("");
  };

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup", userData)
      .then(response => {
        $("#thank-you-modal").show();
        $("#response").text(response);

        setTimeout(() => {
          window.location.replace("/activate");
        }, 8000);

        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  $("#modal-close-btn").on("click", e => {
    e.preventDefault();
    $("#thank-you-modal").hide();
  });

  singupForm.on("submit", handleUserData);
  formBtn.on("click", handleUserData);
});
