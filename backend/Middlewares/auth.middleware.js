const { verifyToken } = require("../Services/jwt.services");

exports.AuthMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "Not Authorized." });
    }
    const decoded = verifyToken(token);
    if (!decoded || !decoded.role || !decoded._id) {
      return res.status(401).json({ error: "Not Authorized." });
    }
    req.user = {
      _id: decoded._id,
      role: decoded.role,
      email: decoded.email,
    };
    next();
  } catch (error) {
    console.warn(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
