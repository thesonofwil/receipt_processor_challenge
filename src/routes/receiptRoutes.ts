import { Router } from "express";
import { ReceiptController } from "../controllers/receiptController";

const router = Router();
const receiptController = new ReceiptController();

router.post("/process", receiptController.processReceipt);
router.get("/:id/points", receiptController.getReceiptPoints);

export { router as receiptRoutes };
