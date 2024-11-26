/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from './Item';
export type Receipt = {
    /**
     * The name of the retailer or store the receipt is from.
     */
    retailer: string;
    /**
     * The date of the purchase printed on the receipt.
     */
    purchaseDate: string;
    /**
     * The time of the purchase printed on the receipt. 24-hour time expected.
     */
    purchaseTime: string;
    items: Array<Item>;
    /**
     * The total amount paid on the receipt.
     */
    total: string;
};

