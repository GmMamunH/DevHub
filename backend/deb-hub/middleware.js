const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader)
    return res.status(401).json({ error: "Access Denied: No token provided." });

  const token = authHeader.split(" ")[1]; // ✅ Remove "Bearer" prefix

  if (!token)
    return res.status(401).json({ error: "Access Denied: Token missing." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Invalid Token:", error);
    res.status(400).json({ error: "Invalid Token" });
  }
};

module.exports = authMiddleware;
