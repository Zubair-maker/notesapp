import { errorHandler } from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, _res, next) => {
  const token = req.cookies.access_token;
  console.log("token",token)
  if (!token) return next(errorHandler(401, "Unauthorized User"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Forbidden error"));
    }

    req.user = user;
    next();
  });
};
