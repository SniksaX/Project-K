import express, {Request, Response, Application, NextFunction } from "express";
import { v4 as uuidv4} from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app: Application = express();
app.use(express.json())

let RequestsUser : Record<string, IpManager> = {};

class IpManager {
  id: string;
  email: string;
  password: string;



}

const SECURITY_TOKEN = "AZKEJ264564azeAZEZAML?EAZqsd";

let userInfo: UserMannager[] = [];

abstract class BaseEntity {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

interface AuthenticatedRequest extends Request {
  user?: any;
}

class UserMannager extends BaseEntity {
  username: string;
  password: string;

  constructor(username: string, password: string, id: string) {
    super(id);
    this.username = username;
    this.password = password;

    userInfo.push(this);
  }

  static async create(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserMannager(username, hashedPassword, uuidv4());
    return { userName: user.username, id: user.id };
  }

  public static async login(username: string, password: string) {
    const userFound = userInfo.find(user => user.username === username);
    if (!userFound) {
      return { success: false, message: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      return { success: false, message: "Invalid password" };
    }

    const token = jwt.sign({ username: userFound.username, id: userFound.id }, SECURITY_TOKEN, { expiresIn: "24h" });

    return {
      success: true,
      token,
      user: { id: userFound.id, username: userFound.username }
    };
  }

  public static verifyJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(403).json({ msg: "Access Denied: No token provided", code: 403 });
    }
  
    jwt.verify(token, SECURITY_TOKEN, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ msg: "Access Denied: Invalid token", code: 403 });
      }
      req.user = decoded;
      next();
    });
  };
}

app.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const response = await UserMannager.create(username, password);
    res.status(200).json({ message: "User created", response });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const response = await UserMannager.login(username, password);
    
    if (!response.success) {
      return res.status(401).json({ message: response.message });
    }

    return res.status(200).json({ message: "Connected", response });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


app.listen(3000, () => {
  console.log(`😂👌🏼 Server running on port 3000 💯💪🏼`);
});
