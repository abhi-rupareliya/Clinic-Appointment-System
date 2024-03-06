const db = require("../Database/config");
const User = db.User;
const {
  hashPassword,
  comparePassword,
} = require("../Services/password.services");
const { generateToken, verifyToken } = require("../Services/jwt.services");
const { sendOTP, verifyOTP } = require("../Services/otp.services");
const os = require("os");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

exports.addUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["password"] },
    });
    if (user) {
      return res.status(401).json({ error: "User Already Exists." });
    }
    const securePassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      role,
      password: securePassword,
    });
    return res
      .status(201)
      .json({ message: "User Registered.", user: newUser.dataValues });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => err.message);
      return res.status(400).json({ errors: validationErrors });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({
      _id: user._id,
      role: user.role,
      email: user.email,
    });

    // Set the token as an HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: "true",
      maxAge: 3600000,
    });

    return res.status(200).json({ message: "Logged in successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.requestOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: { email },
      attributes: { include: ["email", "uid"] },
    });
    if (!user) {
      return res.status(404).json({ error: "Email is not registered." });
    }
    try {
      await sendOTP(email);
      return res.status(200).send({ success: true, message: "OTP sent" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error sending OTP !!!" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { otp, email, password } = req.body;
    const is_verified = verifyOTP(email, otp);
    if (!is_verified) {
      return res.status(401).json({ error: "Wrong OTP." });
    }
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "Email is not registered." });
    }
    const securePassword = await hashPassword(password);
    await user.update({ password: securePassword });
    return res.status(200).json({ message: "Password changed." });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getIP = async (req, res) => {
  const networkInterfaces = os.networkInterfaces();
  let ip;

  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces) {
      if (iface.family === "IPv4" && !iface.internal) {
        ip = iface.address;
        break;
      }
    }
    if (ip) break;
  }
  return res.status(200).json({ ip });
};
