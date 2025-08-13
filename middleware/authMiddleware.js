const jwt = require("jsonwebtoken");
const User = require("../models/userAuthModel");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];
      console.log("Token received:", token);

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request
      req.user = await User.findById(decoded.id).select("-password");

      return next(); // ✅ Don't fall through
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" }); // ✅ Add return
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" }); // ✅ Add return
  }
};
