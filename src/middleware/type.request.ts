//src/middleware/type.requests.ts

import {Request} from "express"

export interface AuthenticatedRequest extends Request {
  user?: { id: string; username: string };
}