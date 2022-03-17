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
exports.TokenService = void 0;
var bignumber_js_1 = require("bignumber.js");
var simple_uniswap_sdk_1 = require("simple-uniswap-sdk");
var TokenService = /** @class */ (function () {
    function TokenService(_ethereumProvider, _supportedNetworkTokens) {
        this._ethereumProvider = _ethereumProvider;
        this._supportedNetworkTokens = _supportedNetworkTokens;
        this._tokensCachedImages = [];
        this._defaultTokenImageSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-1fvnadz-1 eIZpIe" style="color: rgb(136, 141, 155);"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>';
    }
    /**
     * Get the token image url
     * @param contractAddress The contract address
     * @param chainId The chain id
     */
    TokenService.prototype.getTokenImage = function (contractAddress, chainId) {
        return __awaiter(this, void 0, void 0, function () {
            var cachedImage, supportedTokensForNetwork, token, image, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contractAddress = (0, simple_uniswap_sdk_1.getAddress)(contractAddress, true);
                        cachedImage = this._tokensCachedImages.find(function (c) { return c.contractAddress === contractAddress && c.chainId === chainId; });
                        if (cachedImage) {
                            return [2 /*return*/, cachedImage.tokenImageContext];
                        }
                        supportedTokensForNetwork = this._supportedNetworkTokens.find(function (tokens) { return tokens.chainId === chainId; });
                        if (supportedTokensForNetwork) {
                            token = supportedTokensForNetwork.supportedTokens.find(function (c) { return (0, simple_uniswap_sdk_1.getAddress)(c.contractAddress, true) === contractAddress; });
                            if (token === null || token === void 0 ? void 0 : token.tokenImageContext) {
                                this._tokensCachedImages.push({
                                    contractAddress: contractAddress,
                                    chainId: chainId,
                                    tokenImageContext: token.tokenImageContext,
                                });
                                return [2 /*return*/, token.tokenImageContext];
                            }
                        }
                        image = "".concat((0, simple_uniswap_sdk_1.removeEthFromContractAddress)(contractAddress), ".png");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch(image)];
                    case 2:
                        result = _a.sent();
                        if (result.status === 404) {
                            return [2 /*return*/, this.getDefaultTokenImageAndCache(contractAddress, chainId)];
                        }
                        this._tokensCachedImages.push({
                            contractAddress: contractAddress,
                            chainId: chainId,
                            tokenImageContext: { image: image, isSvg: false },
                        });
                        return [2 /*return*/, { image: image, isSvg: false }];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, this.getDefaultTokenImageAndCache(contractAddress, chainId)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get token information
     * @param contractAddress The contract address
     * @param ethereumProvider The custom ethereum provider from the dapp (not our interval one)
     */
    TokenService.prototype.getTokenInformation = function (contractAddress, ethereumProvider) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenFactoryPublic, token, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        contractAddress = (0, simple_uniswap_sdk_1.getAddress)(contractAddress, true);
                        tokenFactoryPublic = new simple_uniswap_sdk_1.TokenFactoryPublic(contractAddress, {
                            ethereumProvider: ethereumProvider,
                        });
                        return [4 /*yield*/, tokenFactoryPublic.getToken()];
                    case 1:
                        token = (_c.sent());
                        _a = token;
                        _b = bignumber_js_1.BigNumber.bind;
                        return [4 /*yield*/, tokenFactoryPublic.balanceOf(this._ethereumProvider.address)];
                    case 2:
                        _a.balance = new (_b.apply(bignumber_js_1.BigNumber, [void 0, _c.sent()]))();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    /**
     * Build extended token
     * @param token The token
     * @param balance The balance
     */
    TokenService.prototype.buildExtendedToken = function (token, balance, 
    // tslint:disable-next-line: ban-types
    fiatPriceResults) {
        return __awaiter(this, void 0, void 0, function () {
            var fiatPrice, _i, _a, _b, key, value;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        for (_i = 0, _a = Object.entries(fiatPriceResults); _i < _a.length; _i++) {
                            _b = _a[_i], key = _b[0], value = _b[1];
                            if (key.toLowerCase() ===
                                (0, simple_uniswap_sdk_1.removeEthFromContractAddress)(token.contractAddress.toLowerCase())) {
                                // @ts-ignore
                                // tslint:disable-next-line: no-string-literal
                                fiatPrice = Number(value['usd']);
                                break;
                            }
                        }
                        _c = {
                            chainId: token.chainId,
                            contractAddress: token.contractAddress,
                            decimals: token.decimals,
                            symbol: token.symbol,
                            name: token.name,
                            fiatPrice: fiatPrice !== undefined ? new bignumber_js_1.BigNumber(fiatPrice) : undefined,
                            balance: new bignumber_js_1.BigNumber(balance)
                        };
                        return [4 /*yield*/, this.getTokenImage(token.contractAddress, token.chainId)];
                    case 1: return [2 /*return*/, (_c.tokenImageContext = _d.sent(),
                            _c)];
                }
            });
        });
    };
    /**
     * Search for tokens
     * @param search The search term
     */
    TokenService.prototype.searchToken = function (search, supportedTokenBalances) {
        var noneCaseSearch = search.toLowerCase();
        for (var i = 0; i < supportedTokenBalances.length; i++) {
            var token = supportedTokenBalances[i];
            if (search &&
                search !== '' &&
                !token.symbol.toLowerCase().includes(noneCaseSearch) &&
                noneCaseSearch !== token.contractAddress.toLowerCase()) {
                token.canShow = false;
            }
            else {
                token.canShow = true;
            }
        }
        return supportedTokenBalances;
    };
    /**
     * Get the default token image and cache it
     * @param contractAddress The contract address
     * @param chainId The chain id
     */
    TokenService.prototype.getDefaultTokenImageAndCache = function (contractAddress, chainId) {
        var tokenImageContext = {
            image: this._defaultTokenImageSvg,
            isSvg: true,
        };
        this._tokensCachedImages.push({
            contractAddress: contractAddress,
            chainId: chainId,
            tokenImageContext: tokenImageContext,
        });
        return { image: this._defaultTokenImageSvg, isSvg: true };
    };
    return TokenService;
}());
exports.TokenService = TokenService;
