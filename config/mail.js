// const domain = require("./options.js")("domain");
// const mailKey = require("./options.js")("mailKey");

class Mail {
  constructor() {
    this.nodemailer = require("nodemailer");
    this.mailgun = require("./options.js")("mailgun");
    this.mailPass = require("./options.js")("mailPass");
  }
  html(key, action) {
    return `<h2>Welcome to Working Out Buddies</h2>
    <br>
          <h3>${action} Code:   ${key}</h3><br>
          <a href="https://workout-buddies.herokuapp.com/${action}">Press link to ${action}</a>

         <p>Expires in ten minutes</p>`;
  }
  mailOptions(email, key, action) {
    return {
      from: "noreply@workingoutbuddies.com",
      to: email,
      subject: "Account " + action + " Link",
      text: `Welcome to Workout Buddies`,
      html: this.html(key, action)
    };
  }
  createTransporter() {
    return this.nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.mailgun, // generated ethereal user
        pass: this.mailPass // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
  async sendMail(email, key, action) {
    const transporter = await this.createTransporter();
    const mailOptions = await this.mailOptions(email, key, action);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return false;
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", this.nodemailer.getTestMessageUrl(info));

      return true;
    });
  }
}

module.exports = Mail;
