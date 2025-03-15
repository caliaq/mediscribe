import { Router } from "express";
import controller from "../controllers/auth";

const router = Router();

router.post("/", controller.access);
router.get("/", controller.guarantee);
router.get("/session", controller.session);
router.get("/status", controller.status);

export default router;
