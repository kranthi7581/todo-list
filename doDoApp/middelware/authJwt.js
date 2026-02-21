const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  // Expected format: "Bearer token"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied. Invalid token format.",
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // payload from JWT
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authenticateToken;
