// src/routes/auth.routes.ts
import { Router, Response, Request } from "express";
import { login, register } from "../controllers/auth.controller";
import { verifyJWT } from "../middleware/auth.middleware";
import { AuthenticatedRequest } from "../middleware/type.request";
import { UserManager } from "../models/user.model";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/protected", verifyJWT, (req: AuthenticatedRequest, res: Response) => {
  res.json({ message: "Access granted", user: req.user });
});

router.get("/verify-email", (req: Request, res: Response) => {
  const { token } = req.query;
  
  if (!token || typeof token !== "string") {
    return res.status(400).json({ message: "Invalid token" });
  }
  
  const user = UserManager.users.find(u => u.verificationToken === token);
  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
  
  user.isVerified = true;
  user.verificationToken = null;
  
  res.status(200).json({ message: "Email verified successfully!" });
});

export default router;
