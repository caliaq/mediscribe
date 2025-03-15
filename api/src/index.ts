import express from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import errorHandler from "./middleware/errorHandler";
import patientsRouter from "./routes/patients";
import recordingsRouter from "./routes/recordings";
import authRouter from "./routes/auth";

const port = process.env.PORT || 4000;
const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
  throw new Error("missing mongodb uri in the .env file");
}

const app = express();
app.use(express.json({ limit: "100MB" }));
app.use(morgan("dev"));
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    name: "sId",
    saveUninitialized: false,
    resave: false,
  })
);

app.use("/api/v2/auth", authRouter);

interface IReq extends express.Request {
  session: any;
}

app.use("/api/api/v2/patients", patientsRouter);
app.use("/api/api/v2/doctors", patientsRouter);
app.use("/api/api/v2/recordings", recordingsRouter);

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
