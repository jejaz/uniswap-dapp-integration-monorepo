"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = exports.MiningAction = exports.SelectTokenActionFrom = void 0;
var SelectTokenActionFrom;
(function (SelectTokenActionFrom) {
    SelectTokenActionFrom["input"] = "input";
    SelectTokenActionFrom["output"] = "output";
})(SelectTokenActionFrom = exports.SelectTokenActionFrom || (exports.SelectTokenActionFrom = {}));
var MiningAction;
(function (MiningAction) {
    MiningAction["approval"] = "approval";
    MiningAction["swap"] = "swap";
})(MiningAction = exports.MiningAction || (exports.MiningAction = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["waitingForConfirmation"] = "waitingForConfirmation";
    TransactionStatus["rejected"] = "rejected";
    TransactionStatus["mining"] = "mining";
    TransactionStatus["completed"] = "completed";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
