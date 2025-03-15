import Doctor from "../models/doctor";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface Doctor {
  credentials: {
    username: string;
    password: string;
  };
  _id: string;
}

const auth = async (username: string, password: string) => {
  const doctor = (await Doctor.findOne({
    "credentials.username": username,
  })) as Doctor;

  if (!doctor) {
    throw new Error("invalid username");
  }

  const { password: doctorPassword } = doctor.credentials;

  const isMatch = await bcrypt.compare(password, doctorPassword);

  if (!isMatch) {
    throw new Error("invalid password");
  }
  return jwt.sign({ doctorId: doctor._id }, process.env.SESSION_SECRET!, {
    expiresIn: "60d",
  });
};

const verify = async (token: string) => {
  const doctor = jwt.verify(token, process.env.SESSION_SECRET!, {
    ignoreExpiration: false,
  });
  return doctor;
};

const getDoctors = async () => {
  const doctors = await Doctor.find();
  return doctors;
};

const getDoctor = async (id: string) => {
  const doctor = await Doctor.findById(id).select("-_id");
  return doctor;
};

const createDoctor = async (data: any) => {
  data.credentials.password = await bcrypt.hash(data.credentials.password, 10);
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
  auth,
  verify,
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
