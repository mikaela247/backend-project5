import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    // Attach user info to request
    req.user = { id: user._id, email: user.email }; // 👈 keep it lightweight
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export default authMiddleware;
