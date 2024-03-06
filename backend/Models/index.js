module.exports = (sequelize, Sequelize) => {
  return {
    Patient: require("./Patient")(sequelize, Sequelize),
    User: require("./User")(sequelize, Sequelize),
    Appointment: require("./Appointment")(sequelize, Sequelize),
    Prescription: require("./Prescription")(sequelize, Sequelize),
  };
};
