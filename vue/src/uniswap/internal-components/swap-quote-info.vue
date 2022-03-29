<template>  
    <div class="uni-ic__swap-quote" v-if="tradeContext">
      <div class="uni-ic__swap-input-container">
        <div class="uni-ic__swap-input-content uni-ic__theme-panel">
          <div class="uni-ic__swap-input-content-main">
            <span class='info-title'
            >
              1 {{ tradeContext.toToken.symbol }} <span class='change-color'>=</span>
              {{ logic.workOutOneEqualTo() }}
              {{ tradeContext.fromToken.symbol }}
            </span>
          </div>
        </div>
      </div>
<!--            TODO: here arrow-->
<!--            <div class="uni-ic__tooltip-container" v-if='showInfo'>-->
<!--              <div class='main-info'>-->
<!--                <div class='main-info-item'>-->
<!--                  <div class='main-item-text'>-->
<!--                    Expected output-->
<!--                  </div>-->
<!--                  <div class='main-item-text'>-->
<!--                    Price impact-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class='main-info-item' style='margin-right: 0; margin-left: auto;'>-->
<!--                  <div class='main-item-text'>-->
<!--                    {{ parseFloat(tradeContext.baseConvertRequest) * parseFloat(tradeContext.expectedConvertQuote)}}-->
<!--                  </div>-->
<!--&lt;!&ndash;                  TODO: calculate&ndash;&gt;-->
<!--                  <div class='main-item-text'>-->
<!--                   %-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class='divider'></div>-->
<!--              <div class="uni-ic__tooltip">-->
<!--                <div-->
<!--                  class="uni-ic__tooltip__item"-->
<!--                  v-if="tradeContext.minAmountConvertQuote"-->
<!--                >-->
<!--                  <div class="uni-ic__tooltip__item__title">-->
<!--                    <div class="uni-ic__tooltip__item__title__content">-->
<!--                      Minimum received after slippage ({{logic.uniswapPairSettings.slippage * 100 }}%)-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="uni-ic__tooltip__item__value">-->
<!--                    {{ tradeContext.minAmountConvertQuote }}-->
<!--                    {{ tradeContext.toToken.symbol }}-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="uni-ic__tooltip__item">-->
<!--                  <div class="uni-ic__tooltip__item__title">-->
<!--                    <div class="uni-ic__tooltip__item__title__content">-->
<!--                      Liquidity Provider Fee-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="uni-ic__tooltip__item__value">-->
<!--                    {{ tradeContext.liquidityProviderFee }}-->
<!--                    {{ tradeContext.fromToken.symbol }}-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="uni-ic__tooltip__item">-->
<!--                  <div class="uni-ic__tooltip__item__title">-->
<!--                    <div class="uni-ic__tooltip__item__title__content">-->
<!--                      Route-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="uni-ic__tooltip__item__value">-->
<!--                    {{ tradeContext.routeText }}-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div-->
<!--                  class="uni-ic__tooltip__item"-->
<!--                  v-if="tradeContext.maximumSent"-->
<!--                >-->
<!--                  <div class="uni-ic__tooltip__item__title">-->
<!--                    <div class="uni-ic__tooltip__item__title__content">-->
<!--                      Maximum sent-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="uni-ic__tooltip__item__value">-->
<!--                    {{ tradeContext.maximumSent }}-->
<!--                    {{ tradeContext.fromToken.symbol }}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SwapQuoteInfo',
  props: ['logic', 'tradeContext'],
  // data() {
  //   return {
  //       showInfo: false
  //   }
  // },
  // methods: {
  //   toggleInfo() {
  //     this.showInfo = !this.showInfo;
  //   }
  // }
});
</script>