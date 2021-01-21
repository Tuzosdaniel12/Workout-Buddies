module.exports = () => {
  return {
    saved: require("./SavedWorkoutsRoutes"),
    auth: require("./authRoutes"),
    bmi: require("./bmiRoutes"),
    workout: require("./workoutsRoutes.js"),
    activate: require("./activateAccountRoute.js"),
    html: require("./htmlRoutes.js")
  };
};
