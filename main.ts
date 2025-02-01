import express, { Application } from "express";
import { config } from "./src/config/env";
import authRoutes from "./src/routes/auth.routes";
import { RateLimiter } from "./src/middleware/limiter.middleware";

const app: Application = express();
app.use(express.json());
app.use(RateLimiter);

app.use("/auth", RateLimiter,authRoutes);

app.listen(config.PORT, () => {
  console.log(`😂 Server running on port ${config.PORT} 💯💪🏼`);
});
