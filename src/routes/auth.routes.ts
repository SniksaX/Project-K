import { Router, Response } from "express";
import { login, register } from "../controllers/auth.controller";
import { AuthenticatedRequest, verifyJWT } from "../middleware/auth.middleware";


const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/protected", verifyJWT, (req: AuthenticatedRequest, res: Response) => {
  res.json({ message: "Access granted", user: req.user });
});

export default router;
