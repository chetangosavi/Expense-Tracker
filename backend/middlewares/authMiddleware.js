import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Failed! User not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Failed! Not authorized, Token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Failed! No token, not authorized" });
  }
};

export default protect;
