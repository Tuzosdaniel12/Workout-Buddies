const { User, Tokens } = require("../models");
const JWT = require("../config/jwt");
const bcrypt = require("bcryptjs");
const secret = require("../config/options")("private");

module.exports = async (req, res) => {
  const tkn = await Tokens.findOne({
    where: { key: req.body.code }
  }).catch(() => {
    return res.json({ message: "No account created yet" });
  });
  if (!tkn) {
    return res.json({ message: "No account created yet" });
  }
  const { token } = tkn;
  const Jwt = new JWT();
  const decodedToken = await Jwt.verify(token, secret).catch(() => {
    return res.json({ message: "Expired code" });
  });

  if (decodedToken === undefined) {
    return res.json({ message: "Expired code" });
  }
  const { email } = decodedToken;

  const password = await bcrypt.hashSync(
    req.body.password,

    bcrypt.genSaltSync(10),

    null
  );

  await User.update(
    {
      password: password
    },
    { where: { email: email } }
  ).catch(() => {
    return res.json({ message: "failed" });
  });

  await Tokens.destroy({ where: { key: req.body.code } }).catch(() => {
    return res.json({ message: "failed" });
  });

  return res.json({ message: "We updated your account with your request" });
};
