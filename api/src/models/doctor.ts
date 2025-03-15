import { Schema, model } from "mongoose";

const doctorSchema = new Schema(
  {
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    credentials: {
      username: { type: String, required: true },
      password: { type: String, required: true },
    },
  },
  { versionKey: false }
);

export default model("Doctor", doctorSchema);
