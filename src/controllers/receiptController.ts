import { Request, Response } from "express";
import { StatusCodes as HttpStatusCodes } from "http-status-codes";
import { ReceiptService } from "../service/receiptService";
import { evaluateError, genericError, ReceiptError } from "../lib/errors";

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
      res.status(HttpStatusCodes.OK).json({ id });
    } catch (e) {
      const error = evaluateError(e);
      res.status(error.statusCode).json({ message: error.message });
    }
  };

  /**
   * GET /receipts/{id}/points
   * Calculates and returns the points associated with a stored receipt
   * @param req express request
   * @param res express response
   */
  public getReceiptPoints = (req: Request, res: Response): void => {
    try {
      const receiptId = req.params.id;
      const points = this.receiptService.getPointsFromReceipt(receiptId);
      res.status(HttpStatusCodes.OK).json({ points });
    } catch (e) {
      const error = evaluateError(e);
      res.status(error.statusCode).json({ message: error.message });
    }
  };
}
