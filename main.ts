//main.ts

import express, { Application } from "express";
import { config } from "./src/config/env";
import authRoutes from "./src/routes/auth.routes";
import { RateLimiter } from "./src/middleware/limiter.middleware";
import { RequestTracker } from "./src/middleware/tracker.middleware";

const app: Application = express();
app.use(express.json());
app.use(RateLimiter);
app.use(RequestTracker)

app.use("/auth", RateLimiter,authRoutes);


app.listen(config.PORT, () => {
  console.log(`😂 Server running on port ${config.PORT} 💯💪🏼`);
});
