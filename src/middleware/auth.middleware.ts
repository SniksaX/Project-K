//src/middleware/auth.middleware.ts

import {Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./type.request";
import jwt from "jsonwebtoken";

import { config } from "../config/env";

export const verifyJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access Denied: No token provided" });

  jwt.verify(token, config.SECURITY_TOKEN, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Access Denied: Invalid token" });

    req.user = decoded as { id: string; username: string }; // Type Assertion
    next();
  });
};
