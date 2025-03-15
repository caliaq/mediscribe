import Doctor from "../models/doctor";

const getDoctors = async () => {
  const doctors = await Doctor.find();
  return doctors;
};

const getDoctor = async (id: string) => {
  const doctor = await Doctor.findById(id).select("-_id");
  return doctor;
};

const createDoctor = async (data: any) => {
  const doctor = new Doctor(data);
  await doctor.save();
  return doctor;
};

const updateDoctor = async (id: string, data: any) => {
  const doctor = await Doctor.findByIdAndUpdate(id, data, { new: true });

  return doctor;
};

const deleteDoctor = async (id: string) => {
  await Doctor.findByIdAndDelete(id);
};

export default {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
