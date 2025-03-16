import Patient from "../models/patient";

const getPatientsByDoctor = async (doctorId: string) => {
  const patients = await Patient.find({ doctorId });
  return patients;
};

const getPatient = async (id: string) => {
  const patient = await Patient.findById(id).select("-_id");
  return patient;
};

const createPatient = async (data: any) => {
  const patient = new Patient(data);
  await patient.save();
  return patient;
};

const updatePatient = async (id: string, data: any) => {
  const patient = await Patient.findByIdAndUpdate(id, data, { new: true });

  return patient;
};

const deletePatient = async (id: string) => {
  await Patient.findByIdAndDelete(id);
};

export default {
  getPatientsByDoctor,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
};
