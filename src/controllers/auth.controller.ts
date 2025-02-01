import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserManager } from "../models/user.model";
import { config } from "../config/env";
interface AuthenticatedRequest extends Request {
    user?: any;
}
  
export const register = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { username, password } = req.body;
    const newUser = await UserManager.create(username, password);
    res.status(201).json({ message: "User created", user: { id: newUser.id, username: newUser.username } });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const login = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { username, password } = req.body;
    const response = await UserManager.login(username, password);
    
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
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
