import { Token } from 'simple-uniswap-sdk';
import { EthereumProvider } from '../ethereum-provider';
import { ExtendedToken } from './models/extended-token';
import { SupportedNetworkTokens } from './models/supported-network-token';
import { SupportedTokenResult } from './models/supported-token-result';
import { TokenImage } from './models/token-image';
export declare class TokenService {
    private _ethereumProvider;
    private _supportedNetworkTokens;
    private _tokensCachedImages;
    private _defaultTokenImageSvg;
    constructor(_ethereumProvider: EthereumProvider, _supportedNetworkTokens: SupportedNetworkTokens[]);
    /**
     * Get the token image url
     * @param contractAddress The contract address
     * @param chainId The chain id
     */
    getTokenImage(contractAddress: string, chainId: number): Promise<TokenImage>;
    /**
     * Get token information
     * @param contractAddress The contract address
     * @param ethereumProvider The custom ethereum provider from the dapp (not our interval one)
     */
    getTokenInformation(contractAddress: string, ethereumProvider: any): Promise<ExtendedToken>;
    /**
     * Build extended token
     * @param token The token
     * @param balance The balance
     */
    buildExtendedToken(token: Token, balance: string, fiatPriceResults: Object): Promise<ExtendedToken>;
    /**
     * Search for tokens
     * @param search The search term
     */
    searchToken(search: string, supportedTokenBalances: SupportedTokenResult[]): SupportedTokenResult[];
    /**
     * Get the default token image and cache it
     * @param contractAddress The contract address
     * @param chainId The chain id
     */
    private getDefaultTokenImageAndCache;
}
