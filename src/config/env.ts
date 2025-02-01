import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  SECURITY_TOKEN: process.env.SECURITY_TOKEN || "default_secret",
};