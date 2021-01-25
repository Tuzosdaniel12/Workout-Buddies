module.exports = function(sequelize, DataTypes) {
  const Tokens = sequelize.define("Tokens", {
    token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
  return Tokens;
};
