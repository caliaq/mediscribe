import { Request, Response, NextFunction } from "express";
import s3 from "../services/aws.ts";

const addRecording = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    if (!body?.data || !body?.patientId || !body?.fileType) {
      throw new Error("data is required");
    }

    const fileName = `${Date.now()}`;
    await s3.addFile(
      `recordings/${body.patientId}/${fileName}.${body.fileType}`,
      body.data
    );
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export default {
  addRecording,
};
