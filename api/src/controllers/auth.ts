import { Request, Response, NextFunction, RequestHandler } from "express";
import doctorsService from "../services/doctors";
import crypto from "crypto";

const sessions: { [key: string]: string } = {};

const access: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error("username and password are required");
    }

    const token = await doctorsService.auth(username, password);

    res.json({ success: true, data: { token } });
  } catch (error) {
    next(error);
  }
};

const guarantee: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.query as { sessionId: string };
    console.log(sessionId);
    const { authorization } = req.headers;
    console.log(authorization);
    if (!Object.keys(sessions).includes(sessionId) || !authorization) {
      throw new Error("invalid request");
    }
    const token = authorization.split(" ")[1];
    await doctorsService.verify(token);
    sessions[sessionId] = token;
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const session: RequestHandler = async (_req, res, next) => {
  try {
    const sessionId: string = crypto.randomUUID();
    sessions[sessionId] = "";
    res.json({ success: true, data: { sessionId } });
  } catch (error) {
    next(error);
  }
};

const status: RequestHandler = async (req, res, next) => {
  try {
    const { sessionId } = req.query as { sessionId: string };
    if (!sessions[sessionId]) {
      res.json({
        success: false,
        data: { message: "sessionId not found" },
      });
      return;
    }
    const token = sessions[sessionId];
    await doctorsService.verify(token);
    res.json({ success: true, data: { status: "active", token } });
  } catch (error) {
    next(error);
  }
};

export default {
  access,
  guarantee,
  session,
  status,
};
