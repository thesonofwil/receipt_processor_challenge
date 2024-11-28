import request from "supertest";
import app from "../src/app";
import { Receipt } from "../src/generated/models/Receipt";
import { StatusCodes as HttpStatusCodes } from "http-status-codes";
import { ReceiptService } from "../src/service/receiptService";

describe("Route Handling in app.ts", () => {
  describe("/receipts/process", () => {
    const url = "/receipts/process";
    describe("POST", () => {
      const spyProcessReceipt: jest.SpyInstance<string, [Receipt]> = jest.spyOn(
        ReceiptService.prototype,
        "processReceipt"
      );

      it("should return a unique ID for a valid receipt", async () => {
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

        const expectedId = "123abc";
        spyProcessReceipt.mockReturnValueOnce(expectedId);

        const response = await request(app).post(url).send(receiptInput);
        expect(response.status).toBe(HttpStatusCodes.OK);
        expect(response.body).toEqual({ id: expectedId });
      });

      it("should return 400 for an invalid receipt", async () => {
        const receiptInput: Receipt = {
          retailer: "Target",
          purchaseDate: "invalidDate",
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

        const response = await request(app).post(url).send(receiptInput);
        expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty("message");
      });
    });
  });

  describe("/receipts/{id}/points", () => {
    describe("GET", () => {
      const spyGetPointsFromReceipt: jest.SpyInstance<number, [string]> =
        jest.spyOn(ReceiptService.prototype, "getPointsFromReceipt");

      it("should return points for a valid receipt", async () => {
        const expectedPoints = 10;
        const receiptId = "receiptId";

        spyGetPointsFromReceipt.mockReturnValueOnce(expectedPoints);

        const response = await request(app).get(
          `/receipts/${receiptId}/points`
        );
        expect(response.status).toBe(HttpStatusCodes.OK);
        expect(response.body).toEqual({ points: expectedPoints });
      });
    });
  });

  it("should return 404 for unfound URL", async () => {
    const response = await request(app).get(`/receipts/unfoundUrl`);
    expect(response.status).toBe(HttpStatusCodes.NOT_FOUND);
  });
});
