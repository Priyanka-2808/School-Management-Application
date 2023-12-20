const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const apiKey = req.header("X-Api-Key");
  const token = req.header("Authorization");

  console.log("API Key:", apiKey);
  console.log("Authorization Token:", token);

  if (!apiKey || !token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Validate apiKey 
    if (apiKey !== "your_api_key") {
      return res.status(401).json({ message: "Invalid API Key" });
    }

    // Validate and decode the token
    const decodedToken = jwt.verify(token, "your_secret_key"); 

    // Attach user information to the request for middleware or route handling
    req.user = decodedToken.user;

    console.log("Token verification successful");
    // If valid, it will proceed to the next middleware
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;