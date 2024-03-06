module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4(),
        primaryKey: true,
      },
      patient: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      dentist: {
        type: Sequelize.UUID,
      },
      status: {
        type: Sequelize.ENUM("pending", "in", "rejected", "completed"),
        defaultValue: "pending",
      },
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      diagnosis: {
        type: Sequelize.STRING,
      },
      treatment: {
        type: Sequelize.STRING,
      },
      remarks: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "appointments",
      timestamps: false,
    }
  );
  return Appointment;
};
