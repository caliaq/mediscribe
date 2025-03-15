import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface IReq extends Request {
  doctorId: string;
}

export default (req: IReq, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization as string;
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Token required");
  }

  jwt.verify(
    token,
    process.env.SESSION_SECRET!,
    (err: jwt.VerifyErrors | null, data: any) => {
      if (err) {
        return res.status(403).send("invalid or expired token");
      }
      req.doctorId = data.doctorId;
      next();
    }
  );
};
