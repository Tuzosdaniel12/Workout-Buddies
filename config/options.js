require("dotenv").config();

const options = {
  siteUrl: process.env.SITEURL || "http://localhost:3000/",
  mysqldb: process.env.DB_PASS,
  access: process.env.ACCESS_SECRET,
  private: process.env.TOKEN_SECRET,
  mailPass: process.env.MAILGUN_PASS,
  mailgun: process.env.MAILGUN,
  port: process.env.PORT || 3000,
  secret: process.env.SECRETE_SESSION,
  algo: process.env.ALGO,
  bmiAPi: process.env.BMI_API
};

module.exports = key => options[key];
