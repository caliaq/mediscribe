import Record from "../models/record";

const getRecords = async () => {
  const records = await Record.find();
  return records;
};

const getRecord = async (id: string) => {
  const record = await Record.findById(id).select("-_id");
  return record;
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

const getRecordsByDoctor = async (patientId: string) => {
  const records = await Record.find({ patientId });
  return records;
};

export default {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
  getRecordsByDoctor,
};
