$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      $("#thank-you-modal").show();
      $("#notification").text("Error");
      $("#response").text("Make sure all fields are filled!!!");
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(res => {
        console.log(res);
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(err => {
        $("#thank-you-modal").show();
        $("#notification").text("Errors");
        document.getElementById(
          "response"
        ).innerHTML = `Create an account!!!<br>Wrong Email or Password<br>Activate Account`;
        console.log(err);
      });
  }
});
