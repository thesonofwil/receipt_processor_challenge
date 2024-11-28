import { Request, Response } from "express";
import { StatusCodes as HttpStatusCodes } from "http-status-codes";
import { ReceiptService } from "../service/receiptService";
import { ReceiptError } from "../lib/errors";

export class ReceiptController {
  private receiptService: ReceiptService;

  constructor() {
    this.receiptService = new ReceiptService();
  }

  /**
   * POST /receipts/process
   * Generates a unique ID for a given receipt
   * @param req express request
   * @param res express response
   */
  public processReceipt = (req: Request, res: Response): void => {
    try {
      const receipt = req.body;
      const id = this.receiptService.processReceipt(receipt);
      console.log("processReceipt: Receipt processed successfully, id:", id);

      res.status(HttpStatusCodes.OK).json({ id });
    } catch (error) {
      console.log("Error: ", error);
      let errorCode = HttpStatusCodes.INTERNAL_SERVER_ERROR; // default code
      let errorMsg: string;
      if (error instanceof ReceiptError) {
        errorCode = error.statusCode;
        errorMsg = error.message;
      }
      res.status(errorCode);
    }
  };

  // GET /receipts/{id}/points
  public getReceiptPoints = (req: Request, res: Response): void => {
    try {
      const receiptId = req.params.id;

      // Delegate processing logic to the service
      const points = this.receiptService.getPointsFromReceipt(receiptId);

      res.status(HttpStatusCodes.OK).json({ points });
    } catch (error) {
      console.log("Error: ", error);
      let errorCode = HttpStatusCodes.INTERNAL_SERVER_ERROR; // default code
      if (error instanceof ReceiptError) {
        errorCode = error.statusCode;
      }
      res.status(errorCode);
    }
  };
}
