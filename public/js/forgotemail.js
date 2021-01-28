const emailForm = $("form.email");
const emailBtn = $("#email");

const handleForgotPass = async e => {
  e.preventDefault();
  console.log(
    $("#email-input")
      .val()
      .trim()
  );
  const email = {
    email: $("#email-input")
      .val()
      .trim()
  };

  const result = await sendEmail(email).catch(err => {
    $("#thank-you-modal").show();
    $("#notification").text("Errors");
    console.log(err, "error");
  });
  if (result.error) {
    $("#thank-you-modal").show();
    $("#notification").text("Invalid Account");
    $("#response").text(result.error);

    setTimeout(() => {
      window.location.replace("/");
    }, 4000);
  }
  $("#thank-you-modal").show();
  $("#notification").text("Email Notification");
  $("#response").text(result.message);

  setTimeout(() => {
    window.location.replace("/reset-password");
  }, 4000);
};

const sendEmail = email => {
  return $.ajax({
    url: "/api/forgot-password",
    data: email,
    method: "GET"
  });
};
emailForm.on("submit", handleForgotPass);
emailBtn.on("click", handleForgotPass);
