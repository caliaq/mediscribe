import { Router } from "express";
import controller from "../controllers/patients";

const router = Router();

router.get("/", controller.getPatients);
router.get("/:id", controller.getPatient);
router.post("/", controller.createPatient);
router.patch("/:id", controller.updatePatient);
router.delete("/:id", controller.deletePatient);

// records
router.get("/:id/records", controller.getRecords);
router.post("/:id/records", controller.addRecord);

export default router;
