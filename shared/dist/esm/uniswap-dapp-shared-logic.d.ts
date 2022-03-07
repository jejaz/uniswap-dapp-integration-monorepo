import { BehaviorSubject, Subject } from 'rxjs';
import { TradeContext, TradeDirection, UniswapPairFactory, UniswapPairSettings } from 'simple-uniswap-sdk';
import { MiningTransaction, SelectTokenActionFrom, SwapSwitchResponse, UniswapDappSharedLogicContext } from './models';
import { ExtendedToken } from './token/models/extended-token';
import { SupportedTokenResult } from './token/models/supported-token-result';
export declare class UniswapDappSharedLogic {
    private _context;
    inputToken: ExtendedToken;
    inputToken$: Subject<ExtendedToken>;
    outputToken: ExtendedToken | undefined;
    outputToken$: Subject<ExtendedToken>;
    factory: UniswapPairFactory | undefined;
    tradeContext: TradeContext | undefined;
    tradeContext$: Subject<TradeContext | undefined>;
    newPriceTradeContext: TradeContext | undefined;
    newPriceTradeContext$: Subject<TradeContext | undefined>;
    loading$: BehaviorSubject<boolean>;
    supportedTokenBalances: SupportedTokenResult[];
    uniswapPairSettings: UniswapPairSettings;
    uniswapPairSettings$: Subject<UniswapPairSettings>;
    selectorOpenFrom: SelectTokenActionFrom | undefined;
    selectorOpenFrom$: Subject<SelectTokenActionFrom | undefined>;
    chainId: number;
    chainId$: Subject<number>;
    supportedNetwork: boolean;
    supportedNetwork$: BehaviorSubject<boolean>;
    miningTransaction: MiningTransaction | undefined;
    miningTransaction$: BehaviorSubject<MiningTransaction | undefined>;
    currentTokenSearch: string | undefined;
    blockNumber: number | undefined;
    tradeCompleted$: BehaviorSubject<boolean>;
    private _confirmSwapOpened;
    private _inputAmount;
    private _tokensFactoryPublic;
    private _quoteSubscription;
    private _ethereumProvider;
    private _coinGecko;
    private _theming;
    private _tokenService;
    private _chainService;
    private _blockStream;
    constructor(_context: UniswapDappSharedLogicContext);
    /**
     * Init the shared logic
     */
    init(): Promise<void>;
    /**
     * Destroy logic
     */
    destroy(): void;
    /**
     * Change ethereum address for your dApp if your provider does not
     * emit the event `accountsChanged`
     * @param ethereumAddress The ethereum address
     */
    changeEthereumAddress(ethereumAddress: string): Promise<void>;
    /**
     * Change the chain for your dApp if your provider does not
     * emit the event `chainChanged`. Your ethereum provider you passed
     * to the lib if changed will work without passing a `newEthereumProvider`
     * if its a brand new instance you need to pass the lib the new ethereum provider
     * @param newEthereumProvider The new ethereum provider
     */
    changeChain(newEthereumProvider?: any): Promise<void>;
    /**
     * Setup ethereum context
     */
    setupEthereumContext(): Promise<void>;
    /**
     * Send the approve allowance
     */
    approveAllowance(): Promise<void>;
    /**
     * Send the swap transaction
     */
    swapTransaction(): Promise<void>;
    /**
     * Toggle showing and hiding the settings
     */
    toggleSettings(): void;
    /**
     * Open token selector from
     */
    openTokenSelectorFrom(): void;
    /**
     * Open token selector to
     */
    openTokenSelectorTo(): void;
    /**
     * Hide the token selector
     */
    hideTokenSelector(): void;
    /**
     * Show the confirm swap modal
     */
    showConfirmSwap(): void;
    /**
     * Hide the confirm swap modal
     */
    hideConfirmSwap(): void;
    /**
     * Show transaction modal
     */
    showTransaction(): void;
    /**
     * Hide the transaction modal
     */
    hideTransaction(): void;
    /**
     * Change token selected
     * @param contractAddress The contract address
     */
    changeToken(contractAddress: string): Promise<void>;
    /**
     * Change trade price
     */
    changeTradePrice(amount: string, directon: TradeDirection): Promise<void>;
    /**
     * Set max input
     */
    setMaxInput(): Promise<string>;
    /**
     * Swap switch
     */
    swapSwitch(): Promise<SwapSwitchResponse>;
    /**
     * Accept the price change
     */
    acceptPriceChange(): void;
    /**
     * work out what 1 is equal to
     */
    workOutOneEqualTo(): string;
    /**
     * Set multihops
     * @param disableMultihops The status of disable multihops
     */
    setDisableMultihops(disableMultihops: boolean): Promise<void>;
    /**
     * Set transaction deadline
     * @param deadlineMinutes The deadline minutes the tx has to be mined before it fails
     */
    setTransactionDeadline(deadlineMinutes: string | number): Promise<void>;
    /**
     * Set transaction slippage
     * @param slippage The slippage the route can take
     */
    setSlippage(slippage: string | number): Promise<void>;
    /**
     * Search for tokens
     * @param search The search term
     */
    searchToken(search: string): SupportedTokenResult[];
    /**
     * See if the transaction is in process
     */
    transactionInProcess(): boolean;
    /**
     * View the tx on etherscan
     */
    viewOnEtherscan(): void;
    /**
     * Execute the trade but honour the last trade direction
     */
    private executeTradeAndHonourLastTradeDirection;
    /**
     * Handle transaction
     * @param transaction The transaction
     * @param miningTransaction The mining transaction
     */
    private handleTransaction;
    /**
     * Change input token
     * @param contractAddress The contract address
     */
    private changeInputToken;
    /**
     * Change output token
     * @param contractAddress The contract address
     */
    private changeOutputToken;
    /**
     * Change token handler
     * @param inputToken The input token
     * @param outputToken The output token
     */
    private changeTokenHandler;
    /**
     * Build factory
     */
    private buildFactory;
    /**
     * Create uniswap pair context
     * @param inputToken The input token
     * @param outputToken The output token
     * @param settings The settings
     */
    private createUniswapPairContext;
    /**
     * Execute the trade quote
     * @param amount The amount
     */
    private trade;
    /**
     * Format trade context values
     * @param context The context
     */
    private formatTradeContext;
    /**
     * Subscribe to the block stream
     */
    private subscribeToBlockStream;
    /**
     * Get the balances of the supported contracts
     */
    private getBalances;
}
