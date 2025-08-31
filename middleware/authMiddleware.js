const jwt = require("jsonwebtoken");
const User = require("../models/userAuthModel");

exports.protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    if (!auth.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded.id must exist; ensure you sign tokens like: jwt.sign({ id: user._id }, ...)
    if (!decoded?.id) {
      return res.status(401).json({ message: "Not authorized, bad token" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    req.user = user;          // <- full user doc
    return next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
