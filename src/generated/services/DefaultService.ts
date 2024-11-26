/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Receipt } from '../models/Receipt';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Submits a receipt for processing
     * Submits a receipt for processing
     * @param requestBody
     * @returns any Returns the ID assigned to the receipt
     * @throws ApiError
     */
    public static postReceiptsProcess(
        requestBody: Receipt,
    ): CancelablePromise<{
        id: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/receipts/process',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `The receipt is invalid`,
            },
        });
    }
    /**
     * Returns the points awarded for the receipt
     * Returns the points awarded for the receipt
     * @param id The ID of the receipt
     * @returns any The number of points awarded
     * @throws ApiError
     */
    public static getReceiptsPoints(
        id: string,
    ): CancelablePromise<{
        points?: number;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/receipts/{id}/points',
            path: {
                'id': id,
            },
            errors: {
                404: `No receipt found for that id`,
            },
        });
    }
}
