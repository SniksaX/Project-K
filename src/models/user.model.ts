import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export class UserManager {
  id: string;
  username: string;
  password: string;
  static users: UserManager[] = [];

  constructor(username: string, password: string) {
    this.id = uuidv4();
    this.username = username;
    this.password = password;
    UserManager.users.push(this);
  }

  static async create(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new UserManager(username, hashedPassword);
  }

  static async login(username: string, password: string) {
    const user = UserManager.users.find((u) => u.username === username);
    if (!user) return { success: false, message: "User not found" };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return { success: false, message: "Invalid password" };

    return { success: true, user: { id: user.id, username: user.username } };
  }
}