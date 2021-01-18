module.exports = function(sequelize, DataTypes) {
  const SavedWorkouts = sequelize.define("SavedWorkouts", {
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  SavedWorkouts.associate = function(models) {
    SavedWorkouts.belongsTo(models.Workouts, {
      foreignKey: {
        allowNull: false
      }
    });

    SavedWorkouts.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return SavedWorkouts;
};
