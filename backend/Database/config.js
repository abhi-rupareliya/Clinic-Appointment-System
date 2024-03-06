require("dotenv").config({ path: "./.env" });
const { Sequelize } = require("sequelize");
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_DIALECT = process.env.DB_DIALECT;
const DB_PORT = process.env.DB_PORT;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Authenticated to database...");
  })
  .catch((error) => {
    console.log(error);
  });

const Models = require("../Models")(sequelize, Sequelize);
const db = {};

// associations
Models.Appointment.belongsTo(Models.Patient, {
  foreignKey: "patient",
});
Models.Appointment.hasMany(Models.Prescription, {
  foreignKey: "appointment",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = Models.User;
db.Patient = Models.Patient;
db.Appointment = Models.Appointment;
db.Prescription = Models.Prescription;

module.exports = db;
