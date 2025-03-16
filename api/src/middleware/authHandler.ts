import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Extend the Express Request type
declare global {
  namespace Express {
    interface Request {
      doctorId?: string;
    }
  }
}

const authHandler: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send("Token required");
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).send("Token required");
    return;
  }

  jwt.verify(
    token,
    process.env.SESSION_SECRET!,
    (err: jwt.VerifyErrors | null, data: any) => {
      if (err) {
        res.status(403).send("Invalid or expired token");
        return;
      }

      req.doctorId = data.doctorId;
      next();
    }
  );
};

export default authHandler;
