import { Subject } from 'rxjs';
import { ChainId } from 'simple-uniswap-sdk';
import { EthereumProvider } from '../ethereum-provider';
export declare class ChainService {
    private _ethereumProvider;
    newBlock$: Subject<number>;
    constructor(_ethereumProvider: EthereumProvider);
    /**
     * Get the block explorer for transaction hash
     * @param chainId The chain id
     * @param transactionHash The transaction hash
     */
    getBlockExplorerLinkForTransactionHash(chainId: ChainId, transactionHash: string): string;
    /**
     * unwatch any block streams
     */
    unwatch(): void;
    /**
     * Get block explorer link for network
     * @param network The network
     */
    private getBlockExplorerForNetwork;
    /**
     * Watch blocks
     */
    private watchBlocks;
    /**
     * Handle new block
     */
    private handleNewBlock;
}
