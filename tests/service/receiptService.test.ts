import { ReceiptService } from "../../src/service/receiptService";
import { Receipt } from "../../src/generated/models/Receipt";
import {
  duplicateReceiptError,
  receiptNotFoundError,
  receiptTotalMismatchError,
} from "../../src/lib/errors";

describe("ReceiptService", () => {
  let receiptService: ReceiptService;

  beforeEach(() => {
    receiptService = new ReceiptService();
  });

  it("Example 1", () => {
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
    const id = receiptService.processReceipt(receiptInput);
    expect(id).toBeDefined();
    expect(typeof id).toBe("string");

    const points = receiptService.getPointsFromReceipt(id);
    expect(points).toEqual(28);
  });

  it("Example 2", () => {
    const receiptInput: Receipt = {
      retailer: "M&M Corner Market",
      purchaseDate: "2022-03-20",
      purchaseTime: "14:33",
      items: [
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
      ],
      total: "9.00",
    };
    const id = receiptService.processReceipt(receiptInput);
    expect(id).toBeDefined();
    expect(typeof id).toBe("string");

    const points = receiptService.getPointsFromReceipt(id);
    expect(points).toEqual(109);
  });

  it("Should not allow duplicate receipts to be processed", () => {
    const receiptInput: Receipt = {
      retailer: "M&M Corner Market",
      purchaseDate: "2022-03-20",
      purchaseTime: "14:33",
      items: [
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
        {
          shortDescription: "Gatorade",
          price: "2.25",
        },
      ],
      total: "9.00",
    };
    const id = receiptService.processReceipt(receiptInput);
    expect(id).toBeDefined();
    expect(typeof id).toBe("string");
    expect(() => receiptService.processReceipt(receiptInput)).toThrow(
      duplicateReceiptError
    );
  });

  it("Should not process receipt if prices don't sum to total", () => {
    const receiptInput: Receipt = {
      retailer: "Target",
      purchaseDate: "2022-01-01",
      purchaseTime: "13:01",
      items: [
        {
          shortDescription: "Mountain Dew 12PK",
          price: "6.49",
        },
      ],
      total: "35.35",
    };
    expect(() => receiptService.processReceipt(receiptInput)).toThrow(
      receiptTotalMismatchError
    );
  });

  it("Should not calculate points if receipt not found", () => {
    expect(() => receiptService.getPointsFromReceipt("invalidId")).toThrow(
      receiptNotFoundError
    );
  });
});
