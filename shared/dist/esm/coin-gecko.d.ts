export declare class CoinGecko {
    private _fiatPriceCache;
    private _cacheMilliseconds;
    constructor();
    /**
     * Get the coin gecko fiat price
     * @param contractAddress The array of contract addresses
     * @param chainId The chain id
     */
    getCoinGeckoFiatPrices(contractAddresses: string[], chainId: number): Promise<any>;
}
