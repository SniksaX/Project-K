// src/models/user.model.ts
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { HttpError } from "../middleware/errorHandler.middleware";

export class UserManager {
  id: string;
  username: string;
  password: string;
  email: string;
  isVerified: boolean;
  verificationToken: string | null;
  static users: UserManager[] = [];

  constructor(username: string, email: string, password: string) {
    this.id = uuidv4();
    this.username = username;
    this.password = password;
    this.email = email;
    this.isVerified = false;
    this.verificationToken = uuidv4();
    UserManager.users.push(this);
  }

  static async create(username: string, email: string, password: string) {
    // Validate that all required fields are provided
    if (!username || !email || !password) {
      throw new HttpError(
        "Missing required fields: username, email, or password",
        400
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return new UserManager(username, email, hashedPassword);
  }

  static async login(email: string, password: string) {
    const user = UserManager.users.find((u) => u.email === email);
    if (!user) return { success: false, message: "User not found" };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return { success: false, message: "Invalid password" };

    if (!user.isVerified) {
      return { success: false, message: "Please verify your email before logging in" };
    }

    return { success: true, user: { id: user.id, username: user.username } };
  }
}
