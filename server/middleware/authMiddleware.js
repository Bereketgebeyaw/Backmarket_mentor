import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token is missing." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "your_secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req.userId = user.userId; // Attach user ID to the request
    next();
  });
};
