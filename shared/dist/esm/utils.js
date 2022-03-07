import { BigNumber } from 'bignumber.js';
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * To precision
     */
    Utils.toPrecision = function (value, significantDigits, significantDigitsForDecimalOnly) {
        if (significantDigits === void 0) { significantDigits = 4; }
        if (significantDigitsForDecimalOnly === void 0) { significantDigitsForDecimalOnly = true; }
        var parsedValue = new BigNumber(value);
        if (significantDigitsForDecimalOnly) {
            var beforeDecimalsCount = parsedValue.toString().split('.')[0].length;
            return parsedValue
                .precision(beforeDecimalsCount + significantDigits, BigNumber.ROUND_DOWN)
                .toFixed();
        }
        else {
            return parsedValue
                .precision(significantDigits, BigNumber.ROUND_DOWN)
                .toFixed();
        }
    };
    /**
     * Format the currency
     * @value The value to format
     */
    Utils.formatCurrency = function (value) {
        return Number(value)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };
    /**
     * Deep clone a object
     * @param object The object
     */
    Utils.deepClone = function (object) {
        return JSON.parse(JSON.stringify(object));
    };
    /**
     * Check if something is zero
     * @param amount The amount
     */
    Utils.isZero = function (amount) {
        if (!amount || amount === '') {
            return true;
        }
        return new BigNumber(amount).eq(0);
    };
    /**
     * Generate random id
     */
    Utils.randomId = function () {
        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        return randLetter + Date.now();
    };
    return Utils;
}());
export { Utils };
