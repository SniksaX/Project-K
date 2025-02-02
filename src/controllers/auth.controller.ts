// src/controller/auth.controller.ts
import { Response } from "express";
import jwt from "jsonwebtoken";
import { UserManager } from "../models/user.model";
import { config } from "../config/env";
import { AuthenticatedRequest } from "../middleware/type.request";
import { sendVerificationEmail } from "../services/email.service";

export const register = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await UserManager.create(username, email, password);
    
    await sendVerificationEmail(newUser.email, newUser.verificationToken!);

    res.status(201).json({ 
      message: "User created. Please check your email to verify your account.", 
      user: { id: newUser.id, username: newUser.username } 
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const login = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await UserManager.login(email, password);
    
    if (!response.success) return res.status(401).json({ message: response.message });

    const token = jwt.sign(
      { 
        id: response.user?.id, 
        username: response.user?.username 
      },
      config.SECURITY_TOKEN, 
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "Connected", token, user: response.user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
