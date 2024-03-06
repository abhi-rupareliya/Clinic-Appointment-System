const validator = require("validator");

const nameValidator = {
  validator: (value) => {
    const trimmedValue = value.trim();
    return validator.isLength(trimmedValue, { min: 3, max: 50 });
  },
  message: "Name must be between 3 and 50 characters",
};

const emailValidator = {
  validator: (value) => {
    const trimmedValue = value.trim();
    return validator.isEmail(trimmedValue);
  },
  message: "Invalid email address",
};

const phoneValidator = {
  validator: (value) => {
    const trimmedValue = value.trim();
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(trimmedValue);
  },
  message: "Invalid phone number",
};

const dateValidator = {
  validator: (value) => {
    const date = new Date(value);
    return date instanceof Date && !isNaN(date.getTime());
  },
  message: "Invalid date of registration",
};

const genderValidator = {
  validator: (value) => {
    const trimmedValue = value.trim().toLowerCase();
    return ["male", "female", "other"].includes(trimmedValue);
  },
  message: "Invalid gender",
};

const addressValidator = {
  validator: (value) => {
    const trimmedValue = value.trim();
    return trimmedValue.length > 0;
  },
  message: "Address is required",
};

const validateAge = {
  validator: (value) => {
    const trimmedValue = value;
    return validator.isNumeric(trimmedValue);
  },
};

module.exports = {
  validateName: nameValidator.validator,
  validateEmail: emailValidator.validator,
  validatePhone: phoneValidator.validator,
  validateDateRegistration: dateValidator.validator,
  validateGender: genderValidator.validator,
  validateBirthdate: dateValidator.validator,
  validateAddress: addressValidator.validator,
  validateAge: validateAge.validator,
};
