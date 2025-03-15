import { Request, Response, NextFunction } from "express";
import doctorsService from "../services/doctors";

const getDoctors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctors = await doctorsService.getDoctors();
    res.json({ success: true, data: doctors });
  } catch (error) {
    next(error);
  }
};

const getDoctor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctor = await doctorsService.getDoctor(req.params.id);
    res.json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctor = await doctorsService.createDoctor(req.body);
    res.json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

const updateDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctor = await doctorsService.updateDoctor(req.params.id, req.body);
    res.json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

const deleteDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await doctorsService.deleteDoctor(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export default {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
