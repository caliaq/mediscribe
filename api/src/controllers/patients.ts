import { Request, Response, NextFunction, RequestHandler } from "express";
import patientsService from "../services/patients";
import recordsService from "../services/records";

const getPatients: RequestHandler = async (req, res, next) => {
  try {
    const doctorId = req.doctorId!;
    const patients = await patientsService.getPatientsByDoctor(doctorId);
    res.json({ success: true, data: patients });
  } catch (error) {
    next(error);
  }
};

const getPatient: RequestHandler = async (req, res, next) => {
  try {
    const patient = await patientsService.getPatient(req.params.id);
    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

const createPatient: RequestHandler = async (req, res, next) => {
  try {
    const patient = await patientsService.createPatient(req.body);
    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

const updatePatient: RequestHandler = async (req, res, next) => {
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

const deletePatient: RequestHandler = async (req, res, next) => {
  try {
    await patientsService.deletePatient(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const getRecords: RequestHandler = async (req, res, next) => {
  try {
    const records = await recordsService.getRecordsByPatient(req.params.id);
    res.json({ success: true, data: records });
  } catch (error) {
    next(error);
  }
};

const addRecord: RequestHandler = (req, res, next) => {
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
