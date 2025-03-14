import { Router } from "express";
import controller from "../controllers/patients.ts";

const router = Router();

router.get("/", controller.getPatients);
router.get("/:id", controller.getPatient);
router.post("/", controller.createPatient);
router.patch("/:id", controller.updatePatient);
router.delete("/:id", controller.deletePatient);

export default router;
