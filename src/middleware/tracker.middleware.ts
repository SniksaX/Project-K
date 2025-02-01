import { Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { AuthenticatedRequest } from "./type.request";

const logFilePath = path.join(__dirname, "../../logs/requests.log");

export const RequestTracker = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const forwardedIp = req.headers["x-forwarded-for"];
    const clientIp = forwardedIp ? (Array.isArray(forwardedIp) ? forwardedIp[0] : forwardedIp) : req.ip;
    const { method, url, headers, body } = req;
    const timestamp = new Date().toISOString();
    const logEntry = JSON.stringify({
        ip: clientIp,
        timestamp,
        method,
        url,
        headers,
        body: method !== "GET" ? body : undefined
    }, null, 2);

    if (!fs.existsSync(path.dirname(logFilePath))) {
        fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
    }

    fs.appendFileSync(logFilePath, logEntry);

    if (method !== "GET") {
        fs.appendFileSync(logFilePath, `Body: ${JSON.stringify(body)}\n`);
    }

    const originalJson = res.json;
    res.json = function (data) {
        const responseLog = `Response: ${JSON.stringify(data)}\n\n`;
        fs.appendFileSync(logFilePath, responseLog);
        return originalJson.call(this, data);
    };

    next();
};
