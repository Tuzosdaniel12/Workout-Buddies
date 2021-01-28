const emailForm = $("form.email");
const emailBtn = $("#email");

const handleForgotPass = async e => {
  e.preventDefault();

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

  $("#thank-you-modal").show();
  $("#notification").text("Reset Email");
  $("#response").text(result.message);

  setTimeout(() => {
    window.location.replace("/reset-password");
  }, 4000);
};

const sendEmail = email => {
  console.log(email);
  return $.ajax({
    url: "/api/forgot-password",
    data: email,
    method: "POST"
  });
};
emailForm.on("submit", handleForgotPass);
emailBtn.on("click", handleForgotPass);
