const {
  validateName,
  validateEmail,
} = require("../Services/Validators/validator");
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          customValidator(value) {
            if (!validateEmail(value)) throw new Error("Invalid Email");
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM("admin", "doctor", "patient", "receptionist"),
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
  return User;
};
