const jwt = require("jsonwebtoken");
const User = require("../models/userAuthModel");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1]; // Fix: splitting the header value correctly
      console.log(token);

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add user from the payload to the request object
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
