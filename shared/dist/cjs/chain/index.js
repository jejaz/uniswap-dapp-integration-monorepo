"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainService = void 0;
var rxjs_1 = require("rxjs");
var simple_uniswap_sdk_1 = require("simple-uniswap-sdk");
var ChainService = /** @class */ (function () {
    function ChainService(_ethereumProvider) {
        this._ethereumProvider = _ethereumProvider;
        this.newBlock$ = new rxjs_1.Subject();
        this.unwatch();
        this.watchBlocks();
    }
    /**
     * Get the block explorer for transaction hash
     * @param chainId The chain id
     * @param transactionHash The transaction hash
     */
    ChainService.prototype.getBlockExplorerLinkForTransactionHash = function (chainId, transactionHash) {
        return "".concat(this.getBlockExplorerForNetwork(chainId), "tx/").concat(transactionHash);
    };
    /**
     * unwatch any block streams
     */
    ChainService.prototype.unwatch = function () {
        this._ethereumProvider.provider.removeAllListeners('block');
    };
    /**
     * Get block explorer link for network
     * @param network The network
     */
    ChainService.prototype.getBlockExplorerForNetwork = function (chainId) {
        switch (chainId) {
            case simple_uniswap_sdk_1.ChainId.MAINNET:
                return 'https://etherscan.io/';
            case simple_uniswap_sdk_1.ChainId.RINKEBY:
                return 'https://rinkeby.etherscan.io/';
            case simple_uniswap_sdk_1.ChainId.ROPSTEN:
                return 'https://ropsten.etherscan.io/';
            case simple_uniswap_sdk_1.ChainId.KOVAN:
                return 'https://kovan.etherscan.io/';
            case simple_uniswap_sdk_1.ChainId.GÖRLI:
                return 'https://goerli.etherscan.io/';
            case simple_uniswap_sdk_1.ChainId.POLYGON:
                return 'https://polygonscan.com/';
            default:
                throw new Error('Network is not defined');
        }
    };
    /**
     * Watch blocks
     */
    ChainService.prototype.watchBlocks = function () {
        var _this = this;
        this._ethereumProvider.provider.on('block', function (block) {
            _this.handleNewBlock(block);
        });
    };
    /**
     * Handle new block
     */
    ChainService.prototype.handleNewBlock = function (block) {
        this.newBlock$.next(block);
    };
    return ChainService;
}());
exports.ChainService = ChainService;
