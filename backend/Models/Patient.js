const {
  validateName,
  validateEmail,
  validateGender,
  validateAddress,
  validatePhone,
  validateAge,
  validateDateRegistration,
} = require("../Services/Validators/validator");
module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define(
    "Patient",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4(),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          customValidator(value) {
            if (!validateName(value)) throw new Error("Invalid Name");
          },
        },
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          customValidator(value) {
            if (!validateGender(value)) throw new Error("Invalid Gender");
          },
        },
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          customValidator(value) {
            if (!validateAge(value)) throw new Error("Invalid Age");
          },
        },
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          customValidator(value) {
            if (!validateAddress(value)) throw new Error("Invalid Address");
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          customValidator(value) {
            if (!validateEmail(value)) throw new Error("Invalid Email");
          },
        },
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          customValidator(value) {
            if (!validatePhone(value)) throw new Error("Invalid Phone");
          },
        },
      },
      date_registration: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        validate: {
          customValidator(value) {
            if (!validateDateRegistration(value))
              throw new Error("Invalid Date Registration");
          },
        },
      },
    },
    {
      tableName: "patients",
      timestamps: false,
    }
  );
  return Patient;
};
