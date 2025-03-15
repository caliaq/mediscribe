import { Router } from "express";
import controller from "../controllers/doctors";

const router = Router();

router.get("/", controller.getDoctors);
router.get("/:id", controller.getDoctor);
router.post("/", controller.createDoctor);
router.patch("/:id", controller.updateDoctor);
router.delete("/:id", controller.deleteDoctor);

export default router;
