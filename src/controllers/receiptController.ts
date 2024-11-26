import { Request, Response } from "express";
import { StatusCodes as HttpStatusCodes } from "http-status-codes";
import { ReceiptService } from "../service/receiptService";

export class ReceiptController {
  private receiptService: ReceiptService;

  constructor() {
    this.receiptService = new ReceiptService();
  }

  // POST /receipts/process
  public processReceipt = (req: Request, res: Response): void => {
    try {
      const receipt = req.body;

      // Delegate processing logic to the service
      const id = this.receiptService.processReceipt(receipt);

      res.status(HttpStatusCodes.OK).json({ id });
    } catch (error) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  // TODO:
  // GET /receipts/{id}/points
}
