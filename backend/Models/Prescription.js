module.exports = (sequelize, Sequelize) => {
  const Prescription = sequelize.define(
    "Prescription",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4(),
        primaryKey: true,
      },
      appointment: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      day: {
        type: Sequelize.INTEGER,
      },
      morning: {
        type: Sequelize.BOOLEAN,
      },
      afternoon: {
        type: Sequelize.BOOLEAN,
      },
      night: {
        type: Sequelize.BOOLEAN,
      },
      before: {
        type: Sequelize.BOOLEAN,
      },
      after: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      tableName: "prescriptions",
      timestamps: false,
    }
  );
  return Prescription;
};
