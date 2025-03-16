import { Schema, model } from "mongoose";

const patientSchema = new Schema(
  {
    doctorId: { type: Schema.Types.ObjectId, required: true },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    birthDate: { type: Date, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
    },
    sex: { type: String, required: true },
    insurance: { type: Number, required: true },
    allergies: { type: Array, default: [] },
  },
  { versionKey: false }
);

export default model("Patient", patientSchema);
