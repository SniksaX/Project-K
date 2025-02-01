//src/middleware/limiter.middleware.ts

import {Response, NextFunction} from "express"
import { AuthenticatedRequest } from "./type.request";

const RATE_LIMIT = 10
const TIME_FRAME = 60 * 1000;
const requestCounts = new Map<string, { count: number; startTime: number }>();

export const RateLimiter = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {

        const ip = req.ip || req.connection.remoteAddress;

        if (!ip) {
            return res.status(400).json({ message: "Unable to determine IP address" });
        }
    
        const now = Date.now();
        const requestData = requestCounts.get(ip);
    
        if (!requestData) {
            requestCounts.set(ip, { count: 1, startTime: now });
            return next();
        }
    
        if (now - requestData.startTime > TIME_FRAME) {
            requestCounts.set(ip, { count: 1, startTime: now });
            return next();
        }
    
        if (requestData.count >= RATE_LIMIT) {
            return res.status(429).json({ message: "Too many requests, please try again later." });
        }
    
        requestData.count++;
        requestCounts.set(ip, requestData);
    
        next();

    } catch {
        return res.status(500).json({message: "something went wrong"})
    }

}