const { User, Tokens } = require("../models");
const JWT = require("../config/jwt");
const secret = require("../config/options")("private");

module.exports = async (req, res) => {
  const { token } = await Tokens.findOne({
    where: { key: req.params.key }
  }).catch(err => {
    console.error(err).res.redirect("/");
  });

  const Jwt = new JWT();
  const decodedToken = await Jwt.verify(token, secret).catch(err => {
    console.error(err);
  });

  if (decodedToken === undefined) {
    return res.redirect(400, "/");
  }
  console.log(decodedToken);
  const { email } = decodedToken;

  await User.update(
    {
      emailBoolean: 1
    },
    { where: { email: email } }
  ).catch(err => {
    res
      .status(401)
      .json(err)
      .res.redirect("/");
  });
  res.redirect("/");
};
