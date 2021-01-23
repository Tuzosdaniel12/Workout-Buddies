module.exports = function(sequelize, DataTypes) {
  const BMI = sequelize.define("BMI", {
    userBmi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  BMI.associate = function({ User }) {
    // Associating User with Workouts
    BMI.belongsTo(User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return BMI;
};
