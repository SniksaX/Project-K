//src/routes/auth.routes.ts


import { Router, Response } from "express";
import { login, register } from "../controllers/auth.controller";
import { verifyJWT } from "../middleware/auth.middleware";
import { AuthenticatedRequest } from "../middleware/type.request";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/protected", verifyJWT, (req: AuthenticatedRequest, res: Response) => {
  res.json({ message: "Access granted", user: req.user });
});

export default router;
