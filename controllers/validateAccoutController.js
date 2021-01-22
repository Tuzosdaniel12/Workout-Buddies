const { User } = require("../models");
const JWT = require("../config/jwt.js");
const private = require("../config/options.js")("private");

module.exports = async (req, res) => {
  const { token } = req.body.token;
  if (token !== null) {
    const Jwt = new JWT();
    const decodedToken = await Jwt.verify(token, private).catch(err => {
      console.error(err);
    });
    if (decodedToken === false) {
      return res.status(400).res.json({
        error: "Incorrect or Expired Link"
      });
    }
    const { email } = decodedToken;

    await User.update(
      {
        emailBoolean: true
      },
      { where: { email: email } }
    ).catch(err => {
      res.status(401).json(err);
    });
    res.redirect(307, "/api/login");
  }
  return res
    .status(400)
    .res.json({
      error: "Incorrect or Expired Link"
    })
    .res.redirect("/login");
};
