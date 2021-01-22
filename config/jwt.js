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
    this.jwt.verify(token, access, async (err, decodedToken) => {
      if (err) {
        return err;
      }
      return decodedToken;
    });
  }
}

module.exports = JWT;
