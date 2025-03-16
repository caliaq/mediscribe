import Record from "../models/record";
import s3 from "./aws";

const getRecords = async () => {
  const records = await Record.find();
  return records;
};

const getRecord = async (id: string) => {
  const record = await Record.findById(id).select("filePath");

  if (record) {
    s3.getFile(record.filePath);
    return record;
  }
};

const createRecord = async (data: any) => {
  const record = new Record(data);
  await record.save();
  return record;
};

const updateRecord = async (id: string, data: any) => {
  const record = await Record.findByIdAndUpdate(id, data, { new: true });
  return record;
};

const deleteRecord = async (id: string) => {
  await Record.findByIdAndDelete(id);
};

const getRecordsByPatient = async (patientId: string) => {
  const records = await Record.find({ patientId });
  return records;
};

export default {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
  getRecordsByPatient,
};
