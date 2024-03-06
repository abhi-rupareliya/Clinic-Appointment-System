const bcryptjs = require("bcryptjs");

exports.hashPassword = async (password) => {
  try {
    const hashedPassword = await bcryptjs.hash(password, 3);
    return hashedPassword;
  } catch (error) {
    throw new Error(error);
  }
};

exports.comparePassword = async (password, hashedPassword) => {
  try {
    if (!hashedPassword) return false;

    const isMatch = await bcryptjs.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};
