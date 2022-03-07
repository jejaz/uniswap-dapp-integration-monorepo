import { BigNumber } from 'bignumber.js';
export declare class Utils {
    /**
     * To precision
     */
    static toPrecision(value: string | number | BigNumber, significantDigits?: number, significantDigitsForDecimalOnly?: boolean): string;
    /**
     * Format the currency
     * @value The value to format
     */
    static formatCurrency(value: string | number): string;
    /**
     * Deep clone a object
     * @param object The object
     */
    static deepClone<T>(object: T): T;
    /**
     * Check if something is zero
     * @param amount The amount
     */
    static isZero(amount: string | number): boolean;
    /**
     * Generate random id
     */
    static randomId(): string;
}
