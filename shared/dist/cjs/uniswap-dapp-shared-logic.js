"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapDappSharedLogic = void 0;
var bignumber_js_1 = require("bignumber.js");
var rxjs_1 = require("rxjs");
var simple_uniswap_sdk_1 = require("simple-uniswap-sdk");
var chain_1 = require("./chain");
var coin_gecko_1 = require("./coin-gecko");
var ethereum_provider_1 = require("./ethereum-provider");
var models_1 = require("./models");
var theming_1 = require("./theming");
var token_1 = require("./token");
var utils_1 = require("./utils");
var UniswapDappSharedLogic = /** @class */ (function () {
    function UniswapDappSharedLogic(_context) {
        this._context = _context;
        this.inputToken$ = new rxjs_1.Subject();
        this.outputToken$ = new rxjs_1.Subject();
        this.tradeContext$ = new rxjs_1.Subject();
        this.newPriceTradeContext$ = new rxjs_1.Subject();
        this.loading$ = new rxjs_1.BehaviorSubject(false);
        this.supportedTokenBalances = [];
        this.uniswapPairSettings = new simple_uniswap_sdk_1.UniswapPairSettings();
        this.uniswapPairSettings$ = new rxjs_1.Subject();
        this.selectorOpenFrom$ = new rxjs_1.Subject();
        this.chainId$ = new rxjs_1.Subject();
        this.supportedNetwork = false;
        this.supportedNetwork$ = new rxjs_1.BehaviorSubject(false);
        this.miningTransaction$ = new rxjs_1.BehaviorSubject(undefined);
        this.tradeCompleted$ = new rxjs_1.BehaviorSubject(false);
        this._confirmSwapOpened = false;
        this._inputAmount = new bignumber_js_1.BigNumber('0');
        this._quoteSubscription = simple_uniswap_sdk_1.UniswapSubscription.EMPTY;
        // services
        this._ethereumProvider = new ethereum_provider_1.EthereumProvider(this._context.ethereumAddress, this._context.ethereumProvider);
        this._coinGecko = new coin_gecko_1.CoinGecko();
        this._theming = new theming_1.Theming(this._context.theming);
        this._tokenService = new token_1.TokenService(this._ethereumProvider, this._context.supportedNetworkTokens);
        this._chainService = new chain_1.ChainService(this._ethereumProvider);
        this._blockStream = rxjs_1.Subscription.EMPTY;
        if (this._context.settings) {
            this.uniswapPairSettings = this._context.settings;
        }
        this.uniswapPairSettings$.next(this.uniswapPairSettings);
    }
    /**
     * Init the shared logic
     */
    UniswapDappSharedLogic.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var eth, supportedNetworkTokens, inputToken, _a, outputToken, _c, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.loading$.next(true);
                        this.supportedNetwork = false;
                        this.supportedNetwork$.next(this.supportedNetwork);
                        this._quoteSubscription.unsubscribe();
                        this._blockStream.unsubscribe();
                        return [4 /*yield*/, this.setupEthereumContext()];
                    case 1:
                        _e.sent();
                        if (!this.supportedNetwork) {
                            this.loading$.next(false);
                            return [2 /*return*/];
                        }
                        eth = simple_uniswap_sdk_1.ETH.info(this.chainId);
                        supportedNetworkTokens = this._context.supportedNetworkTokens.find(function (t) { return t.chainId === _this.chainId; });
                        if (supportedNetworkTokens.defaultInputValue &&
                            this._inputAmount.isZero()) {
                            this._inputAmount = new bignumber_js_1.BigNumber(supportedNetworkTokens.defaultInputValue);
                        }
                        if (!supportedNetworkTokens.supportedTokens.find(function (c) {
                            return c.contractAddress.toLowerCase() === eth.contractAddress.toLowerCase();
                        })) {
                            supportedNetworkTokens.supportedTokens.push({
                                contractAddress: eth.contractAddress,
                            });
                        }
                        inputToken = supportedNetworkTokens.defaultInputToken || eth.contractAddress;
                        _a = this;
                        return [4 /*yield*/, this._tokenService.getTokenInformation(inputToken, this._context.ethereumProvider)];
                    case 2:
                        _a.inputToken = _e.sent();
                        this.inputToken$.next(this.inputToken);
                        outputToken = supportedNetworkTokens.defaultOutputToken || eth.contractAddress;
                        _c = this;
                        return [4 /*yield*/, this._tokenService.getTokenInformation(outputToken, this._context.ethereumProvider)];
                    case 3:
                        _c.outputToken = _e.sent();
                        this.outputToken$.next(this.outputToken);
                        return [4 /*yield*/, this.getBalances()];
                    case 4:
                        _e.sent();
                        this._blockStream = this.subscribeToBlockStream();
                        this._theming.apply();
                        if (!supportedNetworkTokens.defaultOutputToken) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.buildFactory(this.inputToken.contractAddress, supportedNetworkTokens.defaultOutputToken)];
                    case 5:
                        _e.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        _d = this;
                        return [4 /*yield*/, this._tokenService.getTokenInformation(inputToken, this._context.ethereumProvider)];
                    case 7:
                        _d.inputToken = _e.sent();
                        _e.label = 8;
                    case 8:
                        if (this._inputAmount && this.inputToken && this.outputToken) {
                            this.buildFactory(this.inputToken.contractAddress, this.outputToken.contractAddress);
                        }
                        // resync once got context so ordering of tokens
                        // can sync
                        this.getBalances();
                        this.loading$.next(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Destroy logic
     */
    UniswapDappSharedLogic.prototype.destroy = function () {
        var _a;
        this._quoteSubscription.unsubscribe();
        this._blockStream.unsubscribe();
        this._chainService.unwatch();
        (_a = this.tradeContext) === null || _a === void 0 ? void 0 : _a.destroy();
    };
    /**
     * Change ethereum address for your dApp if your provider does not
     * emit the event `accountsChanged`
     * @param ethereumAddress The ethereum address
     */
    UniswapDappSharedLogic.prototype.changeEthereumAddress = function (ethereumAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._quoteSubscription.unsubscribe();
                this._ethereumProvider.updateEthereumAddress(ethereumAddress);
                this.init();
                return [2 /*return*/];
            });
        });
    };
    /**
     * Change the chain for your dApp if your provider does not
     * emit the event `chainChanged`. Your ethereum provider you passed
     * to the lib if changed will work without passing a `newEthereumProvider`
     * if its a brand new instance you need to pass the lib the new ethereum provider
     * @param newEthereumProvider The new ethereum provider
     */
    UniswapDappSharedLogic.prototype.changeChain = function (newEthereumProvider) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (newEthereumProvider) {
                    this._context.ethereumProvider = newEthereumProvider;
                }
                this._ethereumProvider = new ethereum_provider_1.EthereumProvider(this._context.ethereumAddress, this._context.ethereumProvider);
                this._chainService = new chain_1.ChainService(this._ethereumProvider);
                this._tokenService = new token_1.TokenService(this._ethereumProvider, this._context.supportedNetworkTokens);
                this._quoteSubscription.unsubscribe();
                this.init();
                return [2 /*return*/];
            });
        });
    };
    /**
     * Setup ethereum context
     */
    UniswapDappSharedLogic.prototype.setupEthereumContext = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._ethereumProvider.provider.getNetwork()];
                    case 1:
                        _a.chainId = (_c.sent()).chainId;
                        this.chainId$.next(this.chainId);
                        this.supportedNetwork = this._ethereumProvider.isSupportedChain(this.chainId, this._context.supportedNetworkTokens);
                        this.supportedNetwork$.next(this.supportedNetwork);
                        if (this.supportedNetwork) {
                            this._tokensFactoryPublic = new simple_uniswap_sdk_1.TokensFactoryPublic({
                                chainId: this.chainId,
                            });
                        }
                        // handle chain and account changes automatically
                        // if they have event handlers on
                        if (this._context.ethereumProvider.on) {
                            this._context.ethereumProvider.on('accountsChanged', function (accounts) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.changeEthereumAddress(accounts[0])];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            this._context.ethereumProvider.on('chainChanged', function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.changeChain()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Send the approve allowance
     */
    UniswapDappSharedLogic.prototype.approveAllowance = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._theming.hideSettings();
                        this.miningTransaction = {
                            status: models_1.TransactionStatus.waitingForConfirmation,
                            miningAction: models_1.MiningAction.approval,
                        };
                        this.miningTransaction$.next(this.miningTransaction);
                        return [4 /*yield*/, this.handleTransaction(this.tradeContext.approvalTransaction, this.miningTransaction)];
                    case 1:
                        _a.sent();
                        if (this.miningTransaction.status === models_1.TransactionStatus.completed) {
                            this.miningTransaction = undefined;
                            this.miningTransaction$.next(this.miningTransaction);
                            this.tradeContext.approvalTransaction = undefined;
                            this.tradeContext.hasEnoughAllowance = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Send the swap transaction
     */
    UniswapDappSharedLogic.prototype.swapTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.miningTransaction = {
                            status: models_1.TransactionStatus.waitingForConfirmation,
                            miningAction: models_1.MiningAction.swap,
                        };
                        this.miningTransaction$.next(this.miningTransaction);
                        //this.showTransaction();
                        return [4 /*yield*/, this.handleTransaction(this.tradeContext.transaction, this.miningTransaction)];
                    case 1:
                        //this.showTransaction();
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Toggle showing and hiding the settings
     */
    UniswapDappSharedLogic.prototype.toggleSettings = function () {
        if (!this.transactionInProcess()) {
            this._theming.toggleSettings();
        }
    };
    /**
     * Open token selector from
     */
    UniswapDappSharedLogic.prototype.openTokenSelectorFrom = function () {
        this._theming.showTokenSelector();
        this.selectorOpenFrom = models_1.SelectTokenActionFrom.input;
        this.selectorOpenFrom$.next(this.selectorOpenFrom);
    };
    /**
     * Open token selector to
     */
    UniswapDappSharedLogic.prototype.openTokenSelectorTo = function () {
        this._theming.showTokenSelector();
        this.selectorOpenFrom = models_1.SelectTokenActionFrom.output;
        this.selectorOpenFrom$.next(this.selectorOpenFrom);
    };
    /**
     * Hide the token selector
     */
    UniswapDappSharedLogic.prototype.hideTokenSelector = function () {
        this.selectorOpenFrom = undefined;
        this.currentTokenSearch = undefined;
        this._theming.hideTokenSelector();
    };
    /**
     * Show the confirm swap modal
     */
    UniswapDappSharedLogic.prototype.showConfirmSwap = function () {
        this._theming.showConfirmSwap();
        this._confirmSwapOpened = true;
    };
    /**
     * Hide the confirm swap modal
     */
    UniswapDappSharedLogic.prototype.hideConfirmSwap = function () {
        this._theming.hideConfirmSwap();
        this._confirmSwapOpened = false;
        this.acceptPriceChange();
    };
    /**
     * Show transaction modal
     */
    UniswapDappSharedLogic.prototype.showTransaction = function () {
        this._theming.hideConfirmSwap();
        this._theming.showTransaction();
    };
    /**
     * Hide the transaction modal
     */
    UniswapDappSharedLogic.prototype.hideTransaction = function () {
        var _a;
        this._theming.hideTransaction();
        this.miningTransaction = undefined;
        this.miningTransaction$.next(this.miningTransaction);
        (_a = this.tradeContext) === null || _a === void 0 ? void 0 : _a.destroy();
        this.tradeContext = undefined;
        this.tradeContext$.next(undefined);
        this._inputAmount = new bignumber_js_1.BigNumber(0);
        // let the client know the swap all done to clear down the fields
        this.tradeCompleted$.next(true);
        this.tradeCompleted$.next(false);
        this.hideConfirmSwap();
    };
    /**
     * Change token selected
     * @param contractAddress The contract address
     */
    UniswapDappSharedLogic.prototype.changeToken = function (contractAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.selectorOpenFrom;
                        switch (_a) {
                            case models_1.SelectTokenActionFrom.input: return [3 /*break*/, 1];
                            case models_1.SelectTokenActionFrom.output: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.changeInputToken(contractAddress)];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                    case 3: return [4 /*yield*/, this.changeOutputToken(contractAddress)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Change trade price
     */
    UniswapDappSharedLogic.prototype.changeTradePrice = function (amount, directon) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (directon === simple_uniswap_sdk_1.TradeDirection.input) {
                            this._inputAmount = new bignumber_js_1.BigNumber(amount);
                        }
                        if (!!this.factory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.buildFactory(this.inputToken.contractAddress, this.outputToken.contractAddress)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.trade(new bignumber_js_1.BigNumber(amount), directon)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set max input
     */
    UniswapDappSharedLogic.prototype.setMaxInput = function () {
        return __awaiter(this, void 0, void 0, function () {
            var maxBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxBalance = this.inputToken.balance.toFixed();
                        return [4 /*yield*/, this.changeTradePrice(maxBalance, simple_uniswap_sdk_1.TradeDirection.input)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, maxBalance];
                }
            });
        });
    };
    /**
     * Swap switch
     */
    UniswapDappSharedLogic.prototype.swapSwitch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clonedOutput, clonedInput, res, amount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clonedOutput = utils_1.Utils.deepClone(this.outputToken);
                        clonedInput = utils_1.Utils.deepClone(this.inputToken);
                        return [4 /*yield*/, this.buildFactory(clonedOutput.contractAddress, clonedInput.contractAddress, false)];
                    case 1:
                        _a.sent();
                        if (!this.tradeContext) return [3 /*break*/, 6];
                        res = null;
                        amount = null;
                        if (!(this.tradeContext.quoteDirection === simple_uniswap_sdk_1.TradeDirection.output)) return [3 /*break*/, 3];
                        amount = utils_1.Utils.deepClone(this.tradeContext.baseConvertRequest);
                        return [4 /*yield*/, this.trade(new bignumber_js_1.BigNumber(amount), simple_uniswap_sdk_1.TradeDirection.input)];
                    case 2:
                        _a.sent();
                        res = {
                            outputValue: this.tradeContext.expectedConvertQuote,
                            inputValue: amount,
                        };
                        return [3 /*break*/, 5];
                    case 3:
                        amount = utils_1.Utils.deepClone(this.tradeContext.baseConvertRequest);
                        return [4 /*yield*/, this.trade(new bignumber_js_1.BigNumber(amount), simple_uniswap_sdk_1.TradeDirection.output)];
                    case 4:
                        _a.sent();
                        res = {
                            outputValue: amount,
                            inputValue: this.tradeContext.expectedConvertQuote,
                        };
                        _a.label = 5;
                    case 5:
                        this.tradeContext.baseConvertRequest = this.tradeContext.expectedConvertQuote;
                        this.tradeContext.expectedConvertQuote = amount;
                        return [2 /*return*/, res];
                    case 6: return [2 /*return*/, {
                            outputValue: '',
                            inputValue: '',
                        }];
                }
            });
        });
    };
    /**
     * Accept the price change
     */
    UniswapDappSharedLogic.prototype.acceptPriceChange = function () {
        if (this.newPriceTradeContext) {
            this.tradeContext = this.newPriceTradeContext;
            this.tradeContext$.next(this.tradeContext);
        }
        this.newPriceTradeContext = undefined;
        this.newPriceTradeContext$.next(undefined);
    };
    /**
     * work out what 1 is equal to
     */
    UniswapDappSharedLogic.prototype.workOutOneEqualTo = function () {
        var _a;
        return ((_a = this.tradeContext) === null || _a === void 0 ? void 0 : _a.quoteDirection) === simple_uniswap_sdk_1.TradeDirection.input ? utils_1.Utils.toPrecision(new bignumber_js_1.BigNumber(+this.tradeContext.baseConvertRequest /
            +this.tradeContext.expectedConvertQuote)) : utils_1.Utils.toPrecision(new bignumber_js_1.BigNumber(+this.tradeContext.expectedConvertQuote /
            +this.tradeContext.baseConvertRequest));
    };
    /**
     * Set multihops
     * @param disableMultihops The status of disable multihops
     */
    UniswapDappSharedLogic.prototype.setDisableMultihops = function (disableMultihops) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (disableMultihops === this.uniswapPairSettings.disableMultihops) {
                            return [2 /*return*/];
                        }
                        this.uniswapPairSettings.disableMultihops = disableMultihops;
                        this.uniswapPairSettings$.next(this.uniswapPairSettings);
                        return [4 /*yield*/, this.buildFactory(this.inputToken.contractAddress, this.outputToken.contractAddress, false)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.executeTradeAndHonourLastTradeDirection()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set transaction deadline
     * @param deadlineMinutes The deadline minutes the tx has to be mined before it fails
     */
    UniswapDappSharedLogic.prototype.setTransactionDeadline = function (deadlineMinutes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Number(deadlineMinutes) === this.uniswapPairSettings.deadlineMinutes) {
                            return [2 /*return*/];
                        }
                        if (deadlineMinutes === '') {
                            this.uniswapPairSettings.deadlineMinutes = 20;
                        }
                        else {
                            this.uniswapPairSettings.deadlineMinutes = Number(deadlineMinutes);
                        }
                        this.uniswapPairSettings$.next(this.uniswapPairSettings);
                        return [4 /*yield*/, this.buildFactory(this.inputToken.contractAddress, this.outputToken.contractAddress, false)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.executeTradeAndHonourLastTradeDirection()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set transaction slippage
     * @param slippage The slippage the route can take
     */
    UniswapDappSharedLogic.prototype.setSlippage = function (slippage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Number(slippage) / 100 === this.uniswapPairSettings.slippage) {
                            return [2 /*return*/];
                        }
                        if (slippage === '') {
                            this.uniswapPairSettings.slippage = 0.005;
                        }
                        else {
                            this.uniswapPairSettings.slippage = Number(slippage) / 100;
                        }
                        this.uniswapPairSettings$.next(this.uniswapPairSettings);
                        return [4 /*yield*/, this.buildFactory(this.inputToken.contractAddress, this.outputToken.contractAddress, false)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.executeTradeAndHonourLastTradeDirection()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Search for tokens
     * @param search The search term
     */
    UniswapDappSharedLogic.prototype.searchToken = function (search) {
        this.currentTokenSearch = search;
        this.supportedTokenBalances = this._tokenService.searchToken(search, this.supportedTokenBalances);
        return this.supportedTokenBalances;
    };
    /**
     * See if the transaction is in process
     */
    UniswapDappSharedLogic.prototype.transactionInProcess = function () {
        var _a, _c;
        return (((_a = this.miningTransaction) === null || _a === void 0 ? void 0 : _a.status) ===
            models_1.TransactionStatus.waitingForConfirmation ||
            ((_c = this.miningTransaction) === null || _c === void 0 ? void 0 : _c.status) === models_1.TransactionStatus.mining);
    };
    /**
     * View the tx on etherscan
     */
    UniswapDappSharedLogic.prototype.viewOnEtherscan = function () {
        var _a;
        if ((_a = this.miningTransaction) === null || _a === void 0 ? void 0 : _a.blockExplorerLink) {
            window.open(this.miningTransaction.blockExplorerLink, '_blank');
        }
    };
    /**
     * Execute the trade but honour the last trade direction
     */
    UniswapDappSharedLogic.prototype.executeTradeAndHonourLastTradeDirection = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(((_a = this.tradeContext) === null || _a === void 0 ? void 0 : _a.quoteDirection) === simple_uniswap_sdk_1.TradeDirection.output)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.trade(new bignumber_js_1.BigNumber(utils_1.Utils.deepClone(this.tradeContext.baseConvertRequest)), simple_uniswap_sdk_1.TradeDirection.output)];
                    case 1:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.trade(this._inputAmount, simple_uniswap_sdk_1.TradeDirection.input)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handle transaction
     * @param transaction The transaction
     * @param miningTransaction The mining transaction
     */
    UniswapDappSharedLogic.prototype.handleTransaction = function (transaction, miningTransaction) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash_1, blockStream_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._ethereumProvider.sendAsync(transaction)];
                    case 1:
                        txHash_1 = _a.sent();
                        this._quoteSubscription.unsubscribe();
                        miningTransaction.status = models_1.TransactionStatus.mining;
                        miningTransaction.txHash = txHash_1;
                        miningTransaction.blockExplorerLink =
                            this._chainService.getBlockExplorerLinkForTransactionHash(this.chainId, txHash_1);
                        this.miningTransaction$.next(miningTransaction);
                        blockStream_1 = rxjs_1.Subscription.EMPTY;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                blockStream_1 = _this._chainService.newBlock$.subscribe(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var receipt, error_2;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                _a.trys.push([0, 2, , 3]);
                                                return [4 /*yield*/, this._ethereumProvider.provider.getTransactionReceipt(txHash_1)];
                                            case 1:
                                                receipt = _a.sent();
                                                if (receipt) {
                                                    resolve();
                                                    this.miningTransaction.status = models_1.TransactionStatus.completed;
                                                    this.miningTransaction$.next(miningTransaction);
                                                }
                                                return [3 /*break*/, 3];
                                            case 2:
                                                error_2 = _a.sent();
                                                blockStream_1.unsubscribe();
                                                reject(error_2);
                                                return [3 /*break*/, 3];
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); });
                            })];
                    case 2:
                        _a.sent();
                        blockStream_1.unsubscribe();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        miningTransaction.status = models_1.TransactionStatus.rejected;
                        this.miningTransaction$.next(miningTransaction);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Change input token
     * @param contractAddress The contract address
     */
    UniswapDappSharedLogic.prototype.changeInputToken = function (contractAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.changeTokenHandler(contractAddress, this.outputToken.contractAddress)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Change output token
     * @param contractAddress The contract address
     */
    UniswapDappSharedLogic.prototype.changeOutputToken = function (contractAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.changeTokenHandler(this.inputToken.contractAddress, contractAddress)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Change token handler
     * @param inputToken The input token
     * @param outputToken The output token
     */
    UniswapDappSharedLogic.prototype.changeTokenHandler = function (inputToken, outputToken) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.hideTokenSelector();
                        return [4 /*yield*/, this.buildFactory(inputToken, outputToken, false)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.executeTradeAndHonourLastTradeDirection()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Build factory
     */
    UniswapDappSharedLogic.prototype.buildFactory = function (inputToken, outputToken, executeTrade) {
        var _a;
        if (executeTrade === void 0) { executeTrade = true; }
        return __awaiter(this, void 0, void 0, function () {
            var uniswapPair, _c, fiatPrices, _d, _e, _f, _g, _h, _j, _k, _l;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        (_a = this.tradeContext) === null || _a === void 0 ? void 0 : _a.destroy();
                        inputToken = (0, simple_uniswap_sdk_1.getAddress)(inputToken, true);
                        outputToken = (0, simple_uniswap_sdk_1.getAddress)(outputToken, true);
                        uniswapPair = this.createUniswapPairContext(inputToken, outputToken, this.uniswapPairSettings);
                        _c = this;
                        return [4 /*yield*/, uniswapPair.createFactory()];
                    case 1:
                        _c.factory = _m.sent();
                        return [4 /*yield*/, this._coinGecko.getCoinGeckoFiatPrices([
                                this.factory.fromToken.contractAddress,
                                this.factory.toToken.contractAddress,
                            ], this.chainId)];
                    case 2:
                        fiatPrices = _m.sent();
                        _d = this;
                        _f = (_e = this._tokenService).buildExtendedToken;
                        _g = [this.factory.fromToken];
                        return [4 /*yield*/, this.factory.getFromTokenBalance()];
                    case 3: return [4 /*yield*/, _f.apply(_e, _g.concat([_m.sent(), fiatPrices]))];
                    case 4:
                        _d.inputToken = _m.sent();
                        this.inputToken$.next(this.inputToken);
                        _h = this;
                        _k = (_j = this._tokenService).buildExtendedToken;
                        _l = [this.factory.toToken];
                        return [4 /*yield*/, this.factory.getToTokenBalance()];
                    case 5: return [4 /*yield*/, _k.apply(_j, _l.concat([_m.sent(), fiatPrices]))];
                    case 6:
                        _h.outputToken = _m.sent();
                        this.outputToken$.next(this.outputToken);
                        if (!executeTrade) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.trade(this._inputAmount, simple_uniswap_sdk_1.TradeDirection.input)];
                    case 7:
                        _m.sent();
                        _m.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create uniswap pair context
     * @param inputToken The input token
     * @param outputToken The output token
     * @param settings The settings
     */
    UniswapDappSharedLogic.prototype.createUniswapPairContext = function (inputToken, outputToken, settings) {
        if (this._context.ethereumProvider) {
            return new simple_uniswap_sdk_1.UniswapPair({
                fromTokenContractAddress: inputToken,
                toTokenContractAddress: outputToken,
                ethereumAddress: this._ethereumProvider.address,
                ethereumProvider: this._context.ethereumProvider,
                settings: settings,
            });
        }
        return new simple_uniswap_sdk_1.UniswapPair({
            fromTokenContractAddress: inputToken,
            toTokenContractAddress: outputToken,
            ethereumAddress: this._ethereumProvider.address,
            chainId: this.chainId,
            ethereumProvider: this._ethereumProvider.provider,
            settings: settings,
        });
    };
    /**
     * Execute the trade quote
     * @param amount The amount
     */
    UniswapDappSharedLogic.prototype.trade = function (amount, direction) {
        return __awaiter(this, void 0, void 0, function () {
            var context;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!amount.isGreaterThan(0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.factory.trade(amount.toFixed(), direction)];
                    case 1:
                        context = _a.sent();
                        this.tradeContext = this.formatTradeContext(context);
                        this.tradeContext$.next(this.tradeContext);
                        this._quoteSubscription = this.tradeContext.quoteChanged$.subscribe(function (quote) {
                            var _a, _c, _d;
                            if (((_a = _this.miningTransaction) === null || _a === void 0 ? void 0 : _a.miningAction) === models_1.MiningAction.swap &&
                                (((_c = _this.miningTransaction) === null || _c === void 0 ? void 0 : _c.status) === models_1.TransactionStatus.mining ||
                                    ((_d = _this.miningTransaction) === null || _d === void 0 ? void 0 : _d.status) === models_1.TransactionStatus.completed)) {
                                _this._quoteSubscription.unsubscribe();
                                return;
                            }
                            var formattedQuote = _this.formatTradeContext(quote);
                            if (_this._confirmSwapOpened) {
                                _this.newPriceTradeContext = formattedQuote;
                                _this.newPriceTradeContext$.next(_this.newPriceTradeContext);
                            }
                            else {
                                _this.tradeContext = formattedQuote;
                                _this.tradeContext$.next(_this.tradeContext);
                            }
                        });
                        if (this.tradeContext.quoteDirection === simple_uniswap_sdk_1.TradeDirection.output) {
                            this._inputAmount = new bignumber_js_1.BigNumber(utils_1.Utils.deepClone(this.tradeContext.expectedConvertQuote));
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Format trade context values
     * @param context The context
     */
    UniswapDappSharedLogic.prototype.formatTradeContext = function (context) {
        context.liquidityProviderFee = utils_1.Utils.toPrecision(context.liquidityProviderFee);
        if (context.minAmountConvertQuote) {
            context.minAmountConvertQuote = utils_1.Utils.toPrecision(context.minAmountConvertQuote);
        }
        if (context.maximumSent) {
            context.maximumSent = utils_1.Utils.toPrecision(context.maximumSent);
        }
        context.expectedConvertQuote = utils_1.Utils.toPrecision(context.expectedConvertQuote);
        return context;
    };
    /**
     * Subscribe to the block stream
     */
    UniswapDappSharedLogic.prototype.subscribeToBlockStream = function () {
        var _this = this;
        return this._chainService.newBlock$.subscribe(function (block) {
            _this.blockNumber = block;
            _this.getBalances();
        });
    };
    /**
     * Get the balances of the supported contracts
     */
    UniswapDappSharedLogic.prototype.getBalances = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokenWithAllowanceInfo, fiatPrices_1, _a, inputToken, newInputBalance, newInputFiatPrice, outputToken, newOutputBalance, newOutputFiatPrice;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.supportedNetwork) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._tokensFactoryPublic.getAllowanceAndBalanceOfForContracts(this._ethereumProvider.address, this._context.supportedNetworkTokens
                                .find(function (t) { return t.chainId === _this.chainId; })
                                .supportedTokens.map(function (c) { return (0, simple_uniswap_sdk_1.getAddress)(c.contractAddress, true); }), true)];
                    case 1:
                        tokenWithAllowanceInfo = _c.sent();
                        return [4 /*yield*/, this._coinGecko.getCoinGeckoFiatPrices(tokenWithAllowanceInfo.map(function (c) { return c.token.contractAddress; }), this.chainId)];
                    case 2:
                        fiatPrices_1 = _c.sent();
                        _a = this;
                        return [4 /*yield*/, Promise.all(tokenWithAllowanceInfo.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var token, canShow;
                                var _a;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, this._tokenService.buildExtendedToken(item.token, item.allowanceAndBalanceOf.balanceOf, fiatPrices_1)];
                                        case 1:
                                            token = _c.sent();
                                            canShow = true;
                                            if (this.currentTokenSearch) {
                                                canShow = this.supportedTokenBalances.find(function (c) {
                                                    return c.contractAddress.toLowerCase() ===
                                                        item.token.contractAddress.toLowerCase();
                                                }).canShow;
                                            }
                                            _a = {
                                                chainId: token.chainId,
                                                contractAddress: token.contractAddress,
                                                decimals: token.decimals,
                                                symbol: token.symbol,
                                                name: token.name,
                                                fiatPrice: token.fiatPrice,
                                                balance: token.balance,
                                                canShow: canShow
                                            };
                                            return [4 /*yield*/, this._tokenService.getTokenImage(token.contractAddress, token.chainId)];
                                        case 2: return [2 /*return*/, (_a.tokenImageContext = _c.sent(),
                                                _a)];
                                    }
                                });
                            }); }))];
                    case 3:
                        _a.supportedTokenBalances = (_c.sent())
                            .sort(function (a, b) {
                            if (a.name < b.name) {
                                return -1;
                            }
                            if (a.name > b.name) {
                                return 1;
                            }
                            return 0;
                        })
                            .sort(function (a, b) {
                            if (a.balance.isLessThan(b.balance)) {
                                return 1;
                            }
                            if (a.balance.isGreaterThan(b.balance)) {
                                return -1;
                            }
                            return 0;
                        })
                            .sort(function (a, _b) {
                            var _a;
                            if (a.contractAddress === _this.inputToken.contractAddress) {
                                return -1;
                            }
                            if (a.contractAddress === ((_a = _this.outputToken) === null || _a === void 0 ? void 0 : _a.contractAddress)) {
                                return -1;
                            }
                            return 0;
                        });
                        inputToken = this.supportedTokenBalances.find(function (c) { return c.contractAddress === _this.inputToken.contractAddress; });
                        if (inputToken) {
                            newInputBalance = inputToken.balance;
                            newInputFiatPrice = inputToken.fiatPrice;
                            if (!this.inputToken.balance.isEqualTo(newInputBalance) ||
                                (newInputFiatPrice &&
                                    this.inputToken.fiatPrice &&
                                    !this.inputToken.fiatPrice.isEqualTo(newInputFiatPrice))) {
                                this.inputToken.balance = newInputBalance;
                                this.inputToken.fiatPrice = newInputFiatPrice;
                                this.inputToken$.next(this.inputToken);
                            }
                        }
                        if (this.outputToken) {
                            outputToken = this.supportedTokenBalances.find(function (c) { return c.contractAddress === _this.outputToken.contractAddress; });
                            if (outputToken) {
                                newOutputBalance = outputToken.balance;
                                newOutputFiatPrice = outputToken.fiatPrice;
                                if (!this.outputToken.balance.isEqualTo(newOutputBalance) ||
                                    (newOutputFiatPrice &&
                                        this.outputToken.fiatPrice &&
                                        !this.outputToken.fiatPrice.isEqualTo(newOutputFiatPrice))) {
                                    this.outputToken.balance = newOutputBalance;
                                    this.outputToken.fiatPrice = newOutputFiatPrice;
                                    this.outputToken$.next(this.outputToken);
                                }
                            }
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        this.supportedTokenBalances = [];
                        _c.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UniswapDappSharedLogic;
}());
exports.UniswapDappSharedLogic = UniswapDappSharedLogic;
