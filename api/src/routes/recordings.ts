import { Router } from "express";
import controller from "../controllers/recordings";

const router = Router();

router.get("/:id", controller.getRecording);
router.post("/", controller.addRecording);
// router.delete("/:id", controller.deleteRecording);

export default router;
