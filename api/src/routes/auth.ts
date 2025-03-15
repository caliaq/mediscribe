import { Router } from "express";
import controller from "../controllers/auth";

const router = Router();

router.post("/", controller.auth);

export default router;
