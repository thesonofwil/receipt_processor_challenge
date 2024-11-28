import _ from "lodash";
import { ReceiptController } from "../../src/controllers/receiptController";
import { Receipt } from "../../src/generated/models/Receipt";
import { mockRequest, mockResponse } from "../lib/testHelper";
import { StatusCodes as HttpStatusCodes } from "http-status-codes";

describe("ReceiptController", () => {
  let receiptController: ReceiptController;

  beforeEach(() => {
    receiptController = new ReceiptController();
  });

  describe("/receipts/process", () => {
    describe("POST", () => {
      it("Should process valid receipt", () => {
        const receiptInput: Receipt = {
          retailer: "Target",
          purchaseDate: "2022-01-01",
          purchaseTime: "13:01",
          items: [
            {
              shortDescription: "Mountain Dew 12PK",
              price: "6.49",
            },
            {
              shortDescription: "Emils Cheese Pizza",
              price: "12.25",
            },
            {
              shortDescription: "Knorr Creamy Chicken",
              price: "1.26",
            },
            {
              shortDescription: "Doritos Nacho Cheese",
              price: "3.35",
            },
            {
              shortDescription: "   Klarbrunn 12-PK 12 FL OZ  ",
              price: "12.00",
            },
          ],
          total: "35.35",
        };
        const mockReq = mockRequest({ body: receiptInput });
        const mockRes = mockResponse();

        receiptController.processReceipt(mockReq, mockRes);
        expect(mockRes.statusCode).toEqual(HttpStatusCodes.OK);
      });
    });
  });
});
