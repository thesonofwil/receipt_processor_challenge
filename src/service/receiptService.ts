import { Receipt } from "../generated/models/Receipt";
import { v4 as uuidV4 } from "uuid";

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
    return 0;
  }

  private printReceipts(): void {
    for (const [key, value] of this.receipts) {
      console.log(key, ":", value);
    }
  }
}
