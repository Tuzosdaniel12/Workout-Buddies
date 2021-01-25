const JWT = require("../config/jwt.js");
const secret = require("../config/options.js")("private");

class CreateTokens {
  constructor() {
    this.crypto = require("crypto-random-string");
    this.Jwt = new JWT();
  }
  async sign(email) {
    return await this.Jwt.sign({ email: email }, secret, "10min").catch(err => {
      console.error(err);
    });
  }
  key() {
    return this.crypto({ length: 10, type: "alphanumeric" }).toString();
  }
}

module.exports = CreateTokens;
