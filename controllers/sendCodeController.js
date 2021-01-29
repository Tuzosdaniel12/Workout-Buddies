const db = require("../models");
const CreateTokens = require("../util/CreateTokens");
const Mail = require("../config/mail.js");

module.exports = async (req, res) => {
  console.log("here", req.body);
  const dbUser = await db.User.findOne({
    where: { email: req.body.email }
  }).catch(() => {
    return res.json({ message: "No account created yet" });
  });
  if (!dbUser) {
    return res.json({ message: "No account created yet" });
  }

  const Tokens = new CreateTokens();

  const key = await Tokens.key();

  await db.Tokens.create({
    token: await Tokens.sign(req.body.email),
    key: key
  }).catch(err => {
    console.error(err);
  });

  const mail = new Mail();

  if (await mail.sendMail(req.body.email, key, req.body.action)) {
    return res.json({
      message: `Email has been sent, kindly go get the authorization code to ${req.body.action}`
    });
  }
  return res.json({
    message: "error"
  });
};
