const activateForm = $("form.activate");

const handleActivation = async e => {
  e.preventDefault();
  console.log("hit");
  const activation = {
    key: $("#code-input")
      .val()
      .trim()
  };

  const result = await activate(activation).catch(err => {
    $("#thank-you-modal").show();
    $("#notification").text("Errors");
    console.log(err, "error");
  });
  if (result.error) {
    $("#thank-you-modal").show();
    $("#notification").text("Invalid Account");
    $("#response").text(result.error);

    setTimeout(() => {
      window.location.replace("/activate");
    }, 4000);
  }

  //return window.location.replace("/");
};

const activate = activation => {
  return $.ajax({
    url: "/api/activate",
    data: activation,
    method: "PUT"
  });
};
activateForm.on("submit", handleActivation);
