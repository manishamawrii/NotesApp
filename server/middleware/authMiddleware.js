import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {

  console.log("JWT SECRET:", process.env.JWT_SECRET);   // 👈 YAHAN (top pe)

  if (req.method === "OPTIONS") {
    return next();
  }

  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    
    console.log("AUTH HEADER:", req.headers.authorization);  // 👈 already hai

    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("TOKEN EXTRACTED:", token);   // 👈 YAHAN

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("DECODED:", decoded);   // 👈 YAHAN

      const user = await User.findById(decoded.id).select("-password");

      console.log("USER FROM DB:", user);   // 👈 YAHAN

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      return next();

    } catch (error) {
      console.log("VERIFY ERROR:", error.message);   // 👈 already hai
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  console.log("NO TOKEN FOUND");   // 👈 YAHAN

  return res.status(401).json({ message: "Not authorized, no token" });
};
