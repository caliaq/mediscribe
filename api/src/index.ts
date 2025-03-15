import express from "express";
import { connect } from "mongoose";

import errorHandler from "./middleware/errorHandler";
import patientsRouter from "./routes/patients";
import recordingsRouter from "./routes/recordings";

const port = process.env.PORT || 3000;
const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
  throw new Error("missing mongodb uri in the .env file");
}

const app = express();
app.use(express.json());

app.use("/api/v2/patients", patientsRouter);
// app.use("/api/v2/doctors", patientsRouter);
// app.use("/api/v2/records", patientsRouter);
app.use("/api/v2/recordings", recordingsRouter);

app.use(errorHandler);

app.listen(port, async () => {
  console.log("connecting to mongodb");
  connect(mongodbUri)
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch(() => {
      console.error("couldn't connect to mongodb");
      process.exit(1);
    });

  console.log(`The server is running at port ${port}`);
});
