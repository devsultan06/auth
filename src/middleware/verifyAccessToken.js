import jwt from "jsonwebtoken";

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    const error = new Error("Authorization header is missing or invalid");
    error.status = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.id; 
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.status = 401;
      error.message = "Access token has expired";
    } else if (error.name === "JsonWebTokenError") {
      error.status = 401;
      error.message = "Invalid access token";
    } else {
      error.status = 500;
      error.message = "Internal server error";
    }
    return next(error);
  }
};

export default verifyAccessToken;
