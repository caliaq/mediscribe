import { Router } from "express";
import controller from "../controllers/records";

const router = Router();

router.get("/", controller.getRecords);
router.get("/:id", controller.getRecord);
router.post("/", controller.createRecord);
router.patch("/:id", controller.updateRecord);
router.delete("/:id", controller.deleteRecord);

export default router;
