import { Receipt } from "../generated/models/Receipt";
import { v4 as uuidV4 } from "uuid";
import {
  duplicateReceiptError,
  ReceiptError,
  receiptNotFoundError,
} from "../lib/errors";
import _ from "lodash";
import { StatusCodes as HttpStatusCodes } from "http-status-codes";

export class ReceiptService {
  private receipts: Map<string, Receipt>; // store receipts (key: id)

  constructor() {
    this.receipts = new Map<string, Receipt>();
  }

  /**
   *
   * @param receipt
   * @returns
   */
  public processReceipt(receipt: Receipt): string {
    // Check if the receipt is a duplicate of a previously recorded one
    const receipts = Array.from(this.receipts.values());
    if (
      receipts.some((existingReceipt) => _.isEqual(receipt, existingReceipt))
    ) {
      throw duplicateReceiptError;
    }
    // Generate a unique ID for the receipt
    const id = uuidV4();
    // console.log("ID generated: ", id);
    this.receipts.set(id, receipt); // store the receipt with its assigned ID

    return id;
  }

  /**
   *
   * @param receiptId
   * @returns
   */
  public getPointsFromReceipt(receiptId: string): number {
    // Check if receipt exists
    const receipt: Receipt | undefined = this.receipts.get(receiptId);

    if (!receipt) {
      throw receiptNotFoundError;
    }

    return this.calculatePoints(receipt);
  }

  private calculatePoints(receipt: Receipt) {
    let points: number = 0;

    const retailer = receipt.retailer;
    const totalBill = parseFloat(receipt.total);

    // 1 point for every alphanumeric character in retailer name
    const matches = retailer.match(/[a-zA-Z0-9]/g);
    points += matches ? matches.length : 0;

    // 50 points if the total is a round dollar amount with no cents
    if (totalBill % 1 === 0) {
      points += 50;
    }

    // 25 points if the total is a multiple of 0.25
    if (totalBill % 0.25 === 0) {
      points += 25;
    }

    // 5 points for every two items on the receipt
    points += Math.floor(receipt.items.length / 2) * 5;

    // If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2
    // and round up to the nearest integer. The result is the number of points earned.
    for (const item of receipt.items) {
      const descriptionLength = item.shortDescription.trim().length;
      if (descriptionLength % 3 === 0) {
        const pointsEarned = Math.ceil(parseFloat(item.price) * 0.2);
        points += pointsEarned;
      }
    }

    // 6 points if the day in the purchase date is odd
    // Date: YY-MM-DD
    const dateStrings = receipt.purchaseDate.split("-");
    const day = parseInt(dateStrings[2]);
    if (day % 2 === 1) {
      points += 6;
    }

    // 10 points if the time of purchase is after 2:00pm and before 4:00pm
    // Time: HH:MM
    const [hour, minute] = receipt.purchaseTime.split(":").map(Number);
    if ((hour === 14 && minute > 0) || hour === 15) {
      points += 10;
    }

    return points;
  }

  private printReceipts(): void {
    for (const [key, value] of this.receipts) {
      console.log(key, ":", value);
    }
  }
}
