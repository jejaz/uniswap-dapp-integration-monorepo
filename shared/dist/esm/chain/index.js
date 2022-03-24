import { Subject } from 'rxjs';
import { ChainId } from 'simple-uniswap-sdk';
var ChainService = /** @class */ (function () {
    function ChainService(_ethereumProvider) {
        this._ethereumProvider = _ethereumProvider;
        this.newBlock$ = new Subject();
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
            case ChainId.MAINNET:
                return 'https://etherscan.io/';
            case ChainId.RINKEBY:
                return 'https://rinkeby.etherscan.io/';
            case ChainId.ROPSTEN:
                return 'https://ropsten.etherscan.io/';
            case ChainId.KOVAN:
                return 'https://kovan.etherscan.io/';
            case ChainId.GÖRLI:
                return 'https://goerli.etherscan.io/';
            case ChainId.POLYGON:
                return 'https://polygonscan.com/';
            case ChainId.MUMBAI:
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
export { ChainService };
