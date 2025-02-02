//src/middleware/auth.middleware.ts

import {Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./type.request";
import jwt from "jsonwebtoken";

import { config } from "../config/env";
import { HttpError } from "./errorHandler.middleware";
import { sendVerificationEmail } from "../services/email.service";
import { UserManager } from "../models/user.model";

export const verifyJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access Denied: No token provided" });

  jwt.verify(token, config.SECURITY_TOKEN, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Access Denied: Invalid token" });

    req.user = decoded as { id: string; username: string }; // Type Assertion
    next();
  });
};

export const register = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    // Input validation: all fields are required
    if (!username || !email || !password) {
      throw new HttpError("Missing required fields: username, email, or password", 400);
    }

    const newUser = await UserManager.create(username, email, password);

    // Await email sending; if it fails, an error will be thrown
    await sendVerificationEmail(newUser.email, newUser.verificationToken!);

    res.status(201).json({
      message: "User created. Please check your email to verify your account.",
      user: { id: newUser.id, username: newUser.username },
    });
  } catch (error) {
    next(error); // This passes the error to the global error handler middleware
  }
};