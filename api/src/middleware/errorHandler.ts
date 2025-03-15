import { Request, Response, NextFunction } from "express";

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.json({ success: false, data: { message: "something went wrong!" } });
};
