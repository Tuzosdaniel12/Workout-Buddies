const activateForm = $("form.activate");

const handleActivation = async e => {
  e.preventDefault();

  const activation = {
    key: $("#code-input")
      .val()
      .trim()
  };

  try {
    const results = await activate(activation);

    $("#thank-you-modal").show();
    $("#notification").text("Activated");
    $("#response").text(results.message);

    setTimeout(() => {
      window.location.replace("/");
    }, 4000);
  } catch (err) {
    console.log(err);
    $("#thank-you-modal").show();
    $("#notification").text("Errors");
    $("#response").text("");
  }
};

const activate = activation => {
  return $.ajax({
    url: "/api/activate",
    data: activation,
    method: "PUT"
  });
};
activateForm.on("submit", handleActivation);
