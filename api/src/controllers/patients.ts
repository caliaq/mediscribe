import { Request, Response, NextFunction } from "express";
import patientsService from "../services/patients";
import recordsService from "../services/records";

const getPatients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patients = await patientsService.getPatients();
    res.json({ success: true, data: patients });
  } catch (error) {
    next(error);
  }
};

const getPatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patient = await patientsService.getPatient(req.params.id);
    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patient = await patientsService.createPatient(req.body);
    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

const updatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patient = await patientsService.updatePatient(
      req.params.id,
      req.body
    );
    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

const deletePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await patientsService.deletePatient(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const getRecords = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const records = await recordsService.getRecordsByDoctor(req.params.id);
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

const addRecord = (req: Request, res: Response, next: NextFunction) => {
  try {
    const record = recordsService.createRecord({
      ...req.body,
      patientId: req.params.id,
    });
    res.json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

export default {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  getRecords,
  addRecord,
};
