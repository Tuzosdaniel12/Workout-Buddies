const activateForm = $("form.activate");

const handleActivation = async e => {
  e.preventDefault();
  console.log("hit");
  const activation = {
    key: $("#code-input")
      .val()
      .trim()
  };

  await activate(activation).catch(err => {
    console.log(err, "error");
  });
  return window.location.replace("/");
};

const activate = activation => {
  return $.ajax({
    url: "/api/activate",
    data: activation,
    method: "PUT"
  });
};
activateForm.on("submit", handleActivation);
