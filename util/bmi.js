class BMI {
  constructor() {
    this.axios = require("axios");
  }
  getOptions(age, weight, height) {
    console.log(require("../config/options")("bmiAPi"));
    return {
      method: "GET",
      url: "https://fitness-calculator.p.rapidapi.com/bmi",
      params: { age: age, weight: weight, height: height },
      headers: {
        "x-rapidapi-key": require("../config/options")("bmiAPi"),
        "x-rapidapi-host": "fitness-calculator.p.rapidapi.com"
      }
    };
  }
  async getRequest(age, weight, height) {
    const options = await this.getOptions(age, weight, height).catch(error => {
      console.log("inside getRequest()-options");
      console.error(error);
    });
    const { data } = await this.axios.request(options).catch(error => {
      console.log("inside getRequest()-data");
      console.error(error);
    });
    console.log(data.bmi);
    return data.bmi;
  }
}

module.exports = BMI;
