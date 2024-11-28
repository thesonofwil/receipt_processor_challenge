import { ReceiptController } from "../../src/controllers/receiptController";
import { Receipt } from "../../src/generated/models/Receipt";
import { mockRequest } from "../lib/testHelper";
import { StatusCodes as HttpStatusCodes } from "http-status-codes";
import { ReceiptService } from "../../src/service/receiptService";
import { ReceiptError } from "../../src/lib/errors";
import { createResponse } from "node-mocks-http";

describe("ReceiptController", () => {
  let receiptController: ReceiptController;

  beforeEach(() => {
    receiptController = new ReceiptController();
  });

  describe("/receipts/process", () => {
    const spyProcessReceipt: jest.SpyInstance<string, [Receipt]> = jest.spyOn(
      ReceiptService.prototype,
      "processReceipt"
    );

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

    describe("POST", () => {
      it("Should process valid receipt", () => {
        const expectedId = "123abc";

        const mockReq = mockRequest({ body: receiptInput });
        const mockRes = createResponse();
        spyProcessReceipt.mockReturnValueOnce(expectedId);

        receiptController.processReceipt(mockReq, mockRes);
        expect(mockRes.statusCode).toEqual(HttpStatusCodes.OK);
        expect(mockRes._getJSONData()).toEqual({ id: expectedId });
        expect(spyProcessReceipt).toHaveBeenCalledWith(receiptInput);
      });

      it("Should return with an error", () => {
        spyProcessReceipt.mockImplementationOnce(() => {
          throw new ReceiptError("Forbidden error", HttpStatusCodes.FORBIDDEN);
        });

        const mockReq = mockRequest({ body: receiptInput });
        const mockRes = createResponse();
        receiptController.processReceipt(mockReq, mockRes);
        expect(mockRes.statusCode).toEqual(HttpStatusCodes.FORBIDDEN);
        expect(mockRes._getJSONData()).toEqual({ message: "Forbidden error" });
        expect(spyProcessReceipt).toHaveBeenCalledWith(receiptInput);
      });
    });
  });

  describe("/receipts/{id}/points", () => {
    describe("GET", () => {
      const spyGetPointsFromReceipt: jest.SpyInstance<number, [string]> =
        jest.spyOn(ReceiptService.prototype, "getPointsFromReceipt");

      it("Should return points from a receipt", () => {
        const expectedPoints = 10;
        const receiptId = "receiptId";

        const mockReq = mockRequest();
        mockReq.params.id = receiptId;
        const mockRes = createResponse();
        spyGetPointsFromReceipt.mockReturnValueOnce(expectedPoints);

        receiptController.getReceiptPoints(mockReq, mockRes);
        expect(mockRes.statusCode).toEqual(HttpStatusCodes.OK);
        expect(mockRes._getJSONData()).toEqual({ points: expectedPoints });
        expect(spyGetPointsFromReceipt).toHaveBeenCalledWith(receiptId);
      });

      it("Should return with an error", () => {
        const expectedPoints = 10;
        const receiptId = "receiptId";

        spyGetPointsFromReceipt.mockImplementationOnce(() => {
          throw new ReceiptError("Forbidden error", HttpStatusCodes.FORBIDDEN);
        });

        const mockReq = mockRequest();
        mockReq.params.id = receiptId;
        const mockRes = createResponse();
        spyGetPointsFromReceipt.mockReturnValueOnce(expectedPoints);

        receiptController.getReceiptPoints(mockReq, mockRes);
        expect(mockRes.statusCode).toEqual(HttpStatusCodes.FORBIDDEN);
        expect(mockRes._getJSONData()).toEqual({ message: "Forbidden error" });
        expect(spyGetPointsFromReceipt).toHaveBeenCalledWith(receiptId);
      });
    });
  });
});
