import { Schema, model } from "mongoose";

const recordSchema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, required: true },
    doctorId: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date, default: Date.now },
    data: { type: String, required: true },
    summary: { type: String },
  },
  { versionKey: false }
);

export default model("Record", recordSchema);
