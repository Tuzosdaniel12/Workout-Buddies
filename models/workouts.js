module.exports = function(sequelize, DataTypes) {
  const Workouts = sequelize.define("Workouts", {
    // Work out title
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "Body"
    },
    publicBoolean: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Workouts.associate = function(models) {
    // Associating User with Workouts
    Workouts.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    // Workouts.belongsToMany(models.User, {
    //   through: models.AllWorkouts
    // });
  };

  return Workouts;
};
