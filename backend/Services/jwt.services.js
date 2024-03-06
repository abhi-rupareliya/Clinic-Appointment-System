require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET);
};

exports.verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.SECRET);
  return decoded;
};
