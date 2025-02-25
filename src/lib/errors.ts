import { StatusCodes as HttpStatusCodes } from "http-status-codes";

export class ReceiptError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // Call the parent Error constructor
    this.statusCode = statusCode;
  }
}
// ----------------------- Errors --------------------------
export const genericError: ReceiptError = new ReceiptError(
  "An unexpected error occurred",
  HttpStatusCodes.INTERNAL_SERVER_ERROR
);

export const duplicateReceiptError: ReceiptError = new ReceiptError(
  "Receipt has already been posted",
  HttpStatusCodes.BAD_REQUEST
);

export const receiptTotalMismatchError: ReceiptError = new ReceiptError(
  "The sum of the prices of the items does not match with the total on the receipt",
  HttpStatusCodes.BAD_REQUEST
);

export const receiptNotFoundError: ReceiptError = new ReceiptError(
  "Receipt not found",
  HttpStatusCodes.NOT_FOUND
);

// ----------------------------------------------------------
/**
 * Evaluates an unknown to see if it's a receipt error
 * @param e
 * @returns the corresponding receipt error, or a generic error if not an instance
 */
export function evaluateError(e: any): ReceiptError {
  if (e instanceof ReceiptError) {
    return e;
  } else if (e instanceof Error) {
    // Generic error if don't know what happened
    return new ReceiptError(
      e.message ?? "Unexpected error",
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
    // Default fallback
  } else {
    return genericError;
  }
}
