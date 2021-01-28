const { User, Tokens } = require("../models");
const JWT = require("../config/jwt");
const secret = require("../config/options")("private");

module.exports = async (req, res) => {
  const tkn = await Tokens.findOne({
    where: { key: req.body.key }
  }).catch(() => {
    return res.json({ message: "No account created yet" });
  });
  if (!tkn) {
    return res.json({ message: "No account created yet" });
  }
  const { token } = tkn;
  const Jwt = new JWT();
  const decodedToken = await Jwt.verify(token, secret).catch(() => {
    res.json({ message: "Expired code" });
  });

  if (decodedToken === undefined) {
    console.log("here inside ", decodedToken);
    return res.json({ message: "Expired code" });
  }
  const { email } = decodedToken;

  await User.update(
    {
      emailBoolean: 1
    },
    { where: { email: email } }
  ).catch(() => {
    console.log("here inside ");
    res
      .status(401)
      .json({ error: "failed" })
      .res.redirect("/");
  });
  console.log("here");
  return res.json({ message: "We activated your account" });
};
