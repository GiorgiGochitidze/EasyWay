// middleware/verifyToken.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) return res.status(401).json({ error: "ავტორიზაცია აუცილებელია" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    return res.status(403).json({ error: "არასწორი ან ვადაგასული ტოკენი" });
  }
};
