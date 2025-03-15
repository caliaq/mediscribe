import { Request, Response, NextFunction } from "express";
import doctorsService from "../services/doctors";

interface IReq extends Request {
  session: any;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error("username and password are required");
    }

    const doctor = await doctorsService.auth(username, password);

    res.locals.doctor = doctor;
    (req as IReq).session.loggedIn = true;
    (req as IReq).session.doctor = res.locals.doctor;

    res.json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

export default {
  auth,
};
