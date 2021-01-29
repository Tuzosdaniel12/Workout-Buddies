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
    $("#response").text(results.message);
  });

  $("#thank-you-modal").show();
  $("#notification").text("Activated");
  $("#response").text(results.message);

  setTimeout(() => {
    window.location.replace("/");
  }, 4000);
};

const activate = activation => {
  return $.ajax({
    url: "/api/activate",
    data: activation,
    method: "POST"
  });
};
activateForm.on("submit", handleActivation);
