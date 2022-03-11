<template>  
    <div className="uniswap-vue-react" id="uniswap__716283642843643826">
      <Loading v-if="loading" />
      <div v-else>
        <div class="uni-ic uni-ic__theme-background">
          <Header
            v-if="logic && supportedNetwork && inputToken"
            :logic="logic"
            @disableMultihopsCompleted="disableMultihopsCompleted"
            style='display: none;'
          />
  
          <div
            class="uni-ic__swap-container"
            v-if="logic && supportedNetwork && inputToken"
          >
            <div class="uni-ic__swap-content">
              <div class="uni-ic__swap-input-container">
                <div class="uni-ic__swap-input-content uni-ic__theme-panel">
                  <div class="uni-ic__swap-input-content-main">
                    <button
                      class="uni-ic__swap-input-content-main-from-currency-container uni-ic__theme-panel"
                      v-on:click="logic.openTokenSelectorFrom()"
                    >
                      <span class="uni-ic__swap-input-content-main-from-currency">
<!--                        TODO: render only if exists-->
                        <TokenIcon
                          v-if='inputToken.tokenImageContext?.image'
                          classes="uni-ic__swap-input-content-main-from-currency-icon"
                          :context="inputToken.tokenImageContext"
                        />
  
                        <span
                          class="uni-ic__swap-input-content-main-from-currency-symbol"
                          >{{ inputToken.symbol }}</span
                        ><svg
                          width="12"
                          height="7"
                          viewBox="0 0 12 7"
                          fill="none"
                          class="uni-ic__swap-input-content-main-from-currency-choose"
                        >
                          <path
                            d="M0.97168 1L6.20532 6L11.439 1"
                            stroke="#AEAEAE"
                          ></path>
                        </svg>
                      </span>
                    </button>
                    <div class='second-container'>
                    <input
                      class="uni-ic__swap-input-content-main-from uni-ic__theme-panel"
                      autocomplete="off"
                      autocorrect="off"
                      type="number"
                      step="any"
                      placeholder="0.0"
                      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                      v-bind:maxlength="inputToken.decimals"
                      spellcheck="false"
                      v-model="inputValue"
                      :disabled="logic.transactionInProcess()"
                      v-on:input="changeInputTradePrice"
                    />
                      <div class="uni-ic__swap-content-balance-and-price-container">
                        <div class="uni-ic__swap-content-balance-and-price">
                          <div
                            class="uni-ic__swap-content-balance-and-price__balance"
                          >
                            <div
                              class="uni-ic__swap-content-balance-and-price__balance-text"
                            >
                              Balance =
                              {{ inputBalance }}
                            </div>
                          </div>
                          <div
                            class="uni-ic__swap-content-balance-and-price__price"
                            v-if="inputValue && inputFiatPrice"
                          >
                            ~$
                            <span
                              class="uni-ic__swap-content-balance-and-price__price-text"
                            >{{
                                formatCurrency(inputFiatPrice.times(inputValue))
                              }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div
                class="uni-ic__swap-divider uni-ic__theme-panel"
                v-on:click="switchSwap()"
              >
                <img :src="image"/>
              </div>
  
              <div class="uni-ic__swap-output-container">
                <div class="uni-ic__swap-output-content uni-ic__theme-panel">
                  <div class="uni-ic__swap-output-content-main">
                    <button
                      class="
                    uni-ic__swap-output-content-main-select uni-ic__theme-panel
                  "
                      v-on:click="logic.openTokenSelectorTo()"
                    >
                      <span
                        class="uni-ic__swap-output-content-main-select-content"
                        v-if="!outputToken"
                        ><span
                          class="
                        uni-ic__swap-output-content-main-select-content-title
                      "
                          >Select a token</span
                        ><svg
                          width="12"
                          height="7"
                          viewBox="0 0 12 7"
                          fill="none"
                          class="uni-ic__swap-output-content-main-select-content-icon"
                        >
                          <path
                            d="M0.97168 1L6.20532 6L11.439 1"
                            stroke="#AEAEAE"
                          ></path>
                        </svg>
                      </span>
  
                      <span
                        class="uni-ic__swap-input-content-main-from-currency"
                        v-if="outputToken"
                      >
                        <TokenIcon
                          classes="uni-ic__swap-input-content-main-from-currency-icon"
                          :context="outputToken.tokenImageContext"
                        />
  
                        <span
                          class="uni-ic__swap-input-content-main-from-currency-symbol"
                          >{{ outputToken.symbol }}</span
                        ><svg
                          width="12"
                          height="7"
                          viewBox="0 0 12 7"
                          fill="none"
                          class="uni-ic__swap-input-content-main-from-currency-choose"
                        >
                          <path
                            d="M0.97168 1L6.20532 6L11.439 1"
                            stroke="#AEAEAE"
                          ></path>
                        </svg>
                      </span>
                    </button>
                    <div class='second-container'>
                    <input
                      class="uni-ic__swap-output-content-main-from uni-ic__theme-panel"
                      autocomplete="off"
                      autocorrect="off"
                      type="number"
                      step="any"
                      placeholder="0.0"
                      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                      v-bind:maxlength="outputMaxLength"
                      spellcheck="false"
                      v-model="outputValue"
                      v-on:input="changeOutputTradePrice"
                      :disabled="logic.transactionInProcess()"
                    />
                      <div
                        class="uni-ic__swap-content-balance-and-price-container"
                        v-if="outputToken"
                      >
                        <div class="uni-ic__swap-content-balance-and-price">
                          <div
                            class="uni-ic__swap-content-balance-and-price__balance"
                          >
                            <div
                              class="uni-ic__swap-content-balance-and-price__balance-text"
                            >
                              Balance =
                              {{ outputBalance }}
                            </div>
                          </div>
                          <div
                            class="uni-ic__swap-content-balance-and-price__price"
                            v-if="outputValue && outputFiatPrice"
                          >
                            ~$
                            <span
                              class="uni-ic__swap-content-balance-and-price__price-text"
                            >
                          {{
                                formatCurrency(outputFiatPrice.times(outputValue))
                              }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <template v-if="tradeContext && !noLiquidityFound">
              <SwapQuoteInfo :logic="logic" :tradeContext="tradeContext" />
  
              <Approval
                :logic="logic"
                :tradeContext="tradeContext"
                :miningTransaction="miningTransaction"
                :miningTransactionStatus="miningTransactionStatus"
              />
            </template>
  
            <div class="uni-ic__swap-button-container">
              <button
                class="uni-ic__swap-button uni-ic__theme-background-button"
                v-on:click="logic.showConfirmSwap()"
                :disabled="
                  utils().isZero(outputValue) ||
                    (tradeContext && tradeContext.hasEnoughAllowance === false) ||
                    (tradeContext &&
                      tradeContext.fromBalance &&
                      tradeContext.fromBalance.hasEnough === false) ||
                    noLiquidityFound
                "
              >
                <div class="uni-ic__swap-button-text">
                  <span v-if="utils().isZero(outputValue) && !noLiquidityFound"
                    >Swap</span
                  >
                  <span
                    v-if="
                      !utils().isZero(outputValue) &&
                        !noLiquidityFound &&
                        tradeContext &&
                        tradeContext.fromBalance &&
                        tradeContext.fromBalance.hasEnough
                    "
                    >Swap</span
                  >
                  <span
                    v-if="
                      !utils().isZero(outputValue) &&
                        !noLiquidityFound &&
                        tradeContext &&
                        tradeContext.fromBalance &&
                        !tradeContext.fromBalance.hasEnough
                    "
                    >Insufficient
                    {{ tradeContext.fromToken.symbol }}
                    balance</span
                  >
                  <span v-if="noLiquidityFound"
                    >Insufficient liquidity for this trade.
                    <span v-if="logic.uniswapPairSettings.disableMultihops">
                      Try enabling multi-hop trades.</span
                    ></span
                  >
                </div>
              </button>
            </div>
          </div>
  
          <div class="uni-ic__error" v-if="!supportedNetwork">
            <p>
              <strong>Chain id {{ chainId }} is a unsupported network.</strong>
            </p>
          </div>
        </div>
  
        <template v-if="logic && supportedNetwork">
          <TokenModal
            :logic="logic"
            :selectorOpenFrom="selectorOpenFrom"
            :inputToken="inputToken"
            :outputToken="outputToken"
            @switchSwapCompleted="switchSwapCompleted"
            @changeTokenCompleted="changeTokenCompleted"
          />
  
          <ConfirmSwap
            :logic="logic"
            :tradeContext="tradeContext"
            :newPriceTradeContext="newPriceTradeContext"
            :inputFiatPrice="inputFiatPrice"
            :outputFiatPrice="outputFiatPrice"
          />
  
          <TransactionModal
            :logic="logic"
            :miningTransaction="miningTransaction"
            :miningTransactionStatus="miningTransactionStatus"
          />
        </template>
      </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Loading, Header, TokenIcon, SwapQuoteInfo, Approval, ConfirmSwap, TransactionModal, TokenModal } from './internal-components';
import 'uniswap-dapp-integration-shared/styles/uniswap.css';
import { UniswapDappSharedLogic, Utils as UniswapUtils, TradeDirection, ErrorCodes } from 'uniswap-dapp-integration-shared';
import { BigNumber } from 'bignumber.js';
const DEBOUNCE_DELAY = 250;
export default defineComponent({
  name: 'UniswapVue',
  components: {
    Loading,
    Header,
    TokenIcon,
    SwapQuoteInfo,
    Approval,
    ConfirmSwap,
    TransactionModal,
    TokenModal
  },
  props: ['uniswapDappSharedLogicContext', 'image'],

  data() {
    return {
      loading: true,
      inputValue: '',
      inputToken: undefined,
      inputBalance: undefined,
      inputFiatPrice: undefined,
      outputValue: '',
      outputToken: undefined,
      outputBalance: undefined,
      outputFiatPrice: undefined,
      tradeContext: undefined,
      newPriceTradeContext: undefined,
      subscriptions: [],
      miningTransaction: undefined,
      miningTransactionStatus: undefined,
      selectorOpenFrom: undefined,
      supportedNetwork: false,
      chainId: undefined,
      noLiquidityFound: false,
      debounceTimeout: undefined,
      image: this.image
    };
  },

  methods: {
    utils() {
      return UniswapUtils;
    },

    async switchSwap() {
      if (this.noLiquidityFound) {
        return;
      }

      const swapState = await this.logic.swapSwitch();
      this.switchSwapCompleted(swapState);
    },

    formatCurrency(value) {
      return this.utils().formatCurrency(value.toFixed());
    },

    async changeTradePrice(amount, tradeDirection) {
      console.log(amount)
      try {
        await this.logic.changeTradePrice(amount, tradeDirection);
      } catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === ErrorCodes.noRoutesFound) {
          this.handleNoLiquidityFound(true, tradeDirection);
          return false;
        } else {
          throw error;
        }
      }

      this.handleNoLiquidityFound(false, tradeDirection);
      return true;
    },

    async changeInputTradePrice() {
      if (!this.inputValue || new BigNumber(this.inputValue).isEqualTo(0)) {
        this.outputValue = '';

        if (this.debounceTimeout) {
          clearTimeout(this.debounceTimeout);
        }

        return;
      }

      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }

      this.debounceTimeout = setTimeout(() => this._changeInputTradePrice(), DEBOUNCE_DELAY);
    },

    async _changeInputTradePrice() {
      const success = await this.changeTradePrice(this.inputValue, TradeDirection.input);

      if (success) {
        this.outputValue = this.logic.tradeContext.expectedConvertQuote;
      } else {
        this.outputValue = '';
      }
    },

    async changeOutputTradePrice() {
      if (!this.outputValue || new BigNumber(this.outputValue).isEqualTo(0)) {
        this.inputValue = '';

        if (this.debounceTimeout) {
          clearTimeout(this.debounceTimeout);
        }

        return;
      }

      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }

      this.debounceTimeout = setTimeout(() => this._changeOutputTradePrice(), DEBOUNCE_DELAY);
    },

    async _changeOutputTradePrice() {
      const success = await this.changeTradePrice(this.outputValue, TradeDirection.output);

      if (success) {
        this.inputValue = this.logic.tradeContext.expectedConvertQuote;
      } else {
        this.inputValue = '';
      }
    },

    registerEventListeners() {
      this.$el.addEventListener('switchSwapCompleted', swapSwitchResponse => this.switchSwapCompleted(swapSwitchResponse));
      this.$el.addEventListener('changeTokenCompleted', noLiquidityFound => this.changeTokenCompleted(noLiquidityFound));
    },

    switchSwapCompleted(response) {
      this.inputValue = response.inputValue;
      this.outputValue = response.outputValue;
    },

    changeTokenCompleted(noLiquidityFound) {
      var _this$logic$tradeCont;

      this.handleNoLiquidityFound(noLiquidityFound, (_this$logic$tradeCont = this.logic.tradeContext) === null || _this$logic$tradeCont === void 0 ? void 0 : _this$logic$tradeCont.quoteDirection);
    },

    disableMultihopsCompleted(noLiquidityFound) {
      var _this$logic$tradeCont2;

      this.handleNoLiquidityFound(noLiquidityFound, (_this$logic$tradeCont2 = this.logic.tradeContext) === null || _this$logic$tradeCont2 === void 0 ? void 0 : _this$logic$tradeCont2.quoteDirection);
    },

    handleNoLiquidityFound(noLiquidityFound, tradeDirection) {
      this.noLiquidityFound = noLiquidityFound;

      if (noLiquidityFound && tradeDirection) {
        if (tradeDirection === TradeDirection.input) {
          this.outputValue = '';
        } else {
          this.inputValue = '';
        }
      }
    }

  },
  computed: {
    outputMaxLength() {
      var _this$outputToken;

      return (_this$outputToken = this.outputToken) === null || _this$outputToken === void 0 ? void 0 : _this$outputToken.decimals;
    }

  },

  async mounted() {
    var _uniswapDappSharedLog, _uniswapDappSharedLog2, _uniswapDappSharedLog3, _uniswapDappSharedLog4, _uniswapDappSharedLog5, _uniswapDappSharedLog6;

    this.registerEventListeners();
    const uniswapDappSharedLogic = new UniswapDappSharedLogic(this.uniswapDappSharedLogicContext);
    await uniswapDappSharedLogic.init();
    const supportedNetworkTokens = this.uniswapDappSharedLogicContext.supportedNetworkTokens.find(t => t.chainId === uniswapDappSharedLogic.chainId);

    if (supportedNetworkTokens !== null && supportedNetworkTokens !== void 0 && supportedNetworkTokens.defaultInputValue) {
      this.inputValue = supportedNetworkTokens.defaultInputValue;
    }

    if ((_uniswapDappSharedLog = uniswapDappSharedLogic.tradeContext) !== null && _uniswapDappSharedLog !== void 0 && _uniswapDappSharedLog.expectedConvertQuote) {
      this.outputValue = uniswapDappSharedLogic.tradeContext.expectedConvertQuote;
    }

    this.tradeContext = uniswapDappSharedLogic.tradeContext;
    this.subscriptions.push(uniswapDappSharedLogic.tradeContext$.subscribe(context => {
      this.tradeContext = context;

      if (context) {
        if (context.quoteDirection === TradeDirection.input) {
          this.outputValue = context.expectedConvertQuote;
        } else {
          this.inputValue = context.expectedConvertQuote;
        }
      }
    }));
    this.subscriptions.push(uniswapDappSharedLogic.newPriceTradeContext$.subscribe(context => {
      this.newPriceTradeContext = context;
    }));
    this.subscriptions.push(uniswapDappSharedLogic.tradeCompleted$.subscribe(completed => {
      if (completed) {
        this.noLiquidityFound = false;
        this.inputValue = '';
        this.outputValue = '';
      }
    }));
    this.supportedNetwork = uniswapDappSharedLogic.supportedNetwork;
    this.subscriptions.push(uniswapDappSharedLogic.supportedNetwork$.subscribe(supported => {
      this.supportedNetwork = supported;
    }));
    this.chainId = uniswapDappSharedLogic.chainId;
    this.subscriptions.push(uniswapDappSharedLogic.chainId$.subscribe(chainId => {
      this.chainId = chainId;
    }));
    this.miningTransaction = uniswapDappSharedLogic.miningTransaction;
    this.miningTransactionStatus = (_uniswapDappSharedLog2 = uniswapDappSharedLogic.miningTransaction) === null || _uniswapDappSharedLog2 === void 0 ? void 0 : _uniswapDappSharedLog2.status;
    this.subscriptions.push(uniswapDappSharedLogic.miningTransaction$.subscribe(_miningTransaction => {
      this.miningTransaction = _miningTransaction;
      this.miningTransactionStatus = _miningTransaction === null || _miningTransaction === void 0 ? void 0 : _miningTransaction.status;
    }));
    this.selectorOpenFrom = uniswapDappSharedLogic.selectorOpenFrom;
    this.subscriptions.push(uniswapDappSharedLogic.selectorOpenFrom$.subscribe(openFrom => {
      this.selectorOpenFrom = openFrom;
    }));
    this.inputToken = uniswapDappSharedLogic.inputToken;
    this.inputBalance = this.utils().toPrecision((_uniswapDappSharedLog3 = uniswapDappSharedLogic.inputToken) === null || _uniswapDappSharedLog3 === void 0 ? void 0 : _uniswapDappSharedLog3.balance);
    this.inputFiatPrice = (_uniswapDappSharedLog4 = uniswapDappSharedLogic.inputToken) === null || _uniswapDappSharedLog4 === void 0 ? void 0 : _uniswapDappSharedLog4.fiatPrice;
    this.subscriptions.push(uniswapDappSharedLogic.inputToken$.subscribe(token => {
      this.inputToken = token;
      this.inputBalance = this.utils().toPrecision(token.balance);
      this.inputFiatPrice = token.fiatPrice;
    }));
    this.outputToken = uniswapDappSharedLogic.outputToken;
    this.outputBalance = this.utils().toPrecision((_uniswapDappSharedLog5 = uniswapDappSharedLogic.outputToken) === null || _uniswapDappSharedLog5 === void 0 ? void 0 : _uniswapDappSharedLog5.balance);
    this.outputFiatPrice = (_uniswapDappSharedLog6 = uniswapDappSharedLogic.outputToken) === null || _uniswapDappSharedLog6 === void 0 ? void 0 : _uniswapDappSharedLog6.fiatPrice;
    this.subscriptions.push(uniswapDappSharedLogic.outputToken$.subscribe(token => {
      this.outputToken = token;
      this.outputBalance = this.utils().toPrecision(token.balance);
      this.outputFiatPrice = token.fiatPrice;
    }));
    this.subscriptions.push(uniswapDappSharedLogic.loading$.subscribe(_loading => {
      this.loading = _loading;
    }));
    this.logic = uniswapDappSharedLogic;
    this.loading = false;
  },

  unmounted() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

});
</script>