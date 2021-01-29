const util = require("util");
class Mail {
  constructor() {
    this.nodemailer = require("nodemailer");
    this.mailPass = require("./options.js")("mailPass");
    this.siteUrl = require("./options.js")("siteUrl");
  }
  html(key, action) {
    return `<h2>Welcome to Working Out Buddies</h2>
    <br>
          <h3>${action} Code:   ${key}</h3><br>
          <a href="${this.siteUrl}${action}">Press link to ${action}</a>

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
        user: "postmaster@workout-buddies.site", // generated ethereal user
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

    transporter.sendMail = util.promisify(transporter.sendMail);
    try {
      const info = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", this.nodemailer.getTestMessageUrl(info));

      return true;
    } catch (err) {
      console.log(err);

      return false;
    }
  }
}

module.exports = Mail;
