const activateForm = $("form.activate");

const handleActivation = async e => {
  e.preventDefault();
  console.log("hit");
  const activation = {
    key: $("#code-input")
      .val()
      .trim()
  };

  const results = await activate(activation).catch(() => {
    $("#thank-you-modal").show();
    $("#notification").text("Errors");
    console.log(err, "error");
  });
  console.log(results);
  $("#thank-you-modal").show();
  $("#notification").text("Activated");

  if (results.error !== undefined || results.error !== null) {
    $("#response").text(results.error);
  } else {
    $("#response").text(results.success);
  }

  setTimeout(() => {
    window.location.replace("/");
  }, 4000);
};

const activate = activation => {
  return $.ajax({
    url: "/api/activate",
    data: activation,
    method: "PUT"
  });
};
activateForm.on("submit", handleActivation);
