import { createRequest, createResponse } from "node-mocks-http";
import { Request, Response } from "express";

export const mockRequest = (data: any = {}): Request => {
  return createRequest(data);
};

export const mockResponse = (): Response => {
  return createResponse();
};
