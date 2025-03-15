import { Request, Response, NextFunction } from "express";
import recordsService from "../services/records";

const getRecords = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const records = await recordsService.getRecords();
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

const getRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const record = await recordsService.getRecord(req.params.id);
    res.json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

const createRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const record = await recordsService.createRecord(req.body);
    res.json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

const updateRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const record = await recordsService.updateRecord(req.params.id, req.body);
    res.json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

const deleteRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await recordsService.deleteRecord(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export default {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
};
