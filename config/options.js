require("dotenv").config();

const options = {
  mysqldb: process.env.DB_PASS,
  access: process.env.ACCESS_TOKEN_SECRET,
  private: process.env.REFRESH_TOKEN_SECRET,
  mailPass: process.env.MAILGUN_PASS,
  mailgun: process.env.MAILGUN,
  port: process.env.PORT,
  secret: process.env.SECRETE_SESSION,
  algo: process.env.ALGO,
  bmiAPi: process.env.BMI_API
};

module.exports = key => options[key];
