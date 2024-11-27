export class ReceiptError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // Call the parent Error constructor
    this.statusCode = statusCode;
  }
}
