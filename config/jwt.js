class JWT {
  constructor() {
    this.jwt = require("jsonwebtoken");
  }

  async sign(object, access, time) {
    const token = await this.jwt.sign(object, access, {
      expiresIn: time
    });
    return token;
  }
  async verify(token, access) {
    const decoded = await this.jwt.verify(token, access);
    console.log(decoded);
    return decoded;
  }
}

module.exports = JWT;
