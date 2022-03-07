import { providers } from 'ethers';
import { Transaction } from 'simple-uniswap-sdk';
import { SupportedNetworkTokens } from './token/models/supported-network-token';
export declare class EthereumProvider {
    private _address;
    private _ethersProvider;
    constructor(_address: string, provider: any);
    /**
     * Get the ethereum address
     */
    get address(): string;
    /**
     * Get the ethers provider
     */
    get provider(): providers.StaticJsonRpcProvider | providers.JsonRpcProvider | providers.InfuraProvider | providers.Web3Provider;
    /**
     * Send async
     * @param transaction The transaction
     */
    sendAsync(transaction: Transaction): Promise<string>;
    /**
     * Is support chain
     */
    isSupportedChain(chainId: number, supportedNetworkTokens: SupportedNetworkTokens[]): boolean;
    /**
     * Update ethereum address
     * @param address The address
     */
    updateEthereumAddress(address: string): void;
}
