const emailForm = $("form.email");
const emailBtn = $("#email");

const handleForgotPass = async e => {
  e.preventDefault();

  const email = {
    email: $("#email-input")
      .val()
      .trim(),
    action: $("#email-input").data("target")
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
    if (email.action === "reset-password") {
      window.location.replace("/reset-password");
    } else if (email.action === "resend-activation") {
      window.location.replace("/activate");
    } else {
      window.location.replace("/");
    }
  }, 4000);
};

const sendEmail = email => {
  console.log(email);
  return $.ajax({
    url: "/api/send-email",
    data: email,
    method: "POST"
  });
};
emailForm.on("submit", handleForgotPass);
emailBtn.on("click", handleForgotPass);
