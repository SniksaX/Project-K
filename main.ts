import express, { Application } from "express";
import { config } from "./src/config/env";
import authRoutes from "./src/routes/auth.routes";

const app: Application = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(config.PORT, () => {
  console.log(`😂👌🏼 Server running on port ${config.PORT} 💯💪🏼`);
});
