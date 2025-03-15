import { Request, Response, NextFunction } from "express";
import s3 from "../services/aws";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import recordsService from "../services/records";

interface IReq extends Request {
  doctorId: string;
}

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
    const filePath = `recordings/${body.patientId}/${fileName}.${body.fileType}`;
    await s3.addFile(filePath, body.data);

    const request = await axios.post(`${process.env.AI_API_URL}process`, {
      filePath,
    });

    const { correctedText } = request.data;

    await recordsService.createRecord({
      patientId: body.patientId,
      data: correctedText,
      doctorId: (req as IReq).doctorId,
      summary: "To do",
    });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export default {
  addRecording,
};
