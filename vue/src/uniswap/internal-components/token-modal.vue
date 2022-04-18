<template>  
    <div id="uni-ic__modal-token" class="uni-ic__modal">
      <div
        class="uni-ic__modal__content uni-ic__modal-tokens uni-ic__theme-background"
      >
        <span class="uni-ic__modal__close" v-on:click="closeTokenSelectorModal()"
          >&times;</span
        >
        <p class="uni-ic__modal-tokens-title">
          Select a token
        </p>
        <div class="uni-ic__modal-tokens-search">
          <input
            type="text"
            placeholder="Search name or paste address"
            autocomplete="off"
            class="uni-ic__modal-tokens-search__input"
            v-model="searchToken"
            v-on:input="searchForToken"
          />
        </div>

        <div class='common-bases'>
          <span class='common-bases-text'>Common bases</span>

          <div class='common-bases-input-wrapper'>
            <div class="common-bases-input" v-on:click="changeSelectToken(logic.supportedTokenBalances.filter((elem) => elem.symbol === 'THEOS'))">
            <img
              width="24"
              height="24"
              alt="THEOS"
              :src="theosLogo"
            />
              <span class='common-bases-input-text'>
                THEOS
              </span>
            </div>
            <div class="common-bases-input" v-on:click="changeSelectToken(logic.supportedTokenBalances.filter((elem) => elem.symbol === 'MATIC'))">
              <img
                width="24"
                height="24"
                alt="MATIC"
                :src="maticLogo"
              />
              <span class='common-bases-input-text'>
                MATIC
              </span>
            </div>
          </div>
        </div>
  
        <div style="flex: 1 1 0%; position: relative; height: 100%;">
          <div class='token-modal-wrapper' >
              <div class='token-modal-wrapper-2'>
                <div
                  v-for="(token, index) in logic.supportedTokenBalances"
                  v-bind:key="token.contractAddress"
                  v-on:click="changeSelectToken(token.contractAddress)"
                  class="uni-ic__modal-tokens-item-container"
                  v-bind:class="{
                    selected:
                      (token.contractAddress ===
                        logic.inputToken.contractAddress &&
                        selectorOpenFrom === 'input') ||
                      (logic.outputToken &&
                        token.contractAddress ===
                          logic.outputToken.contractAddress &&
                        selectorOpenFrom === 'output'),
                  }"
                >
                  <div class="uni-ic__modal-tokens-item" v-if="token.canShow">
                    <TokenIcon
                      v-if='token.symbol == "THEOS" || token.symbol == "MATIC"'
                      classes="uni-ic__modal-tokens-item-icon"
                      :context="token.tokenImageContext"
                      :logo='token.symbol == "THEOS" ? theosLogo : maticLogo'
                    />
                    <div v-else style='width: 24px; height: 24px;'>
                    </div>
  
                    <div class="uni-ic__modal-tokens-item-content">
                      <div class="uni-ic__modal-tokens-item-content-name">
                        {{ token.name }}
                      </div>
                      <div class="uni-ic__modal-tokens-item-content-symbol">
                        {{ token.symbol }}
                      </div>
                    </div>
                    <span></span>
                    <div class="uni-ic__modal-tokens-item-balance-content">
                      <div
                        class="uni-ic__modal-tokens-item-balance-content-value"
                      >
                        {{ utils().toPrecision(token.balance) }}
                      </div>
                    </div>
                  </div>
                  <div v-if='index !== logic.supportedTokenBalances.length - 1' class='divider'></div>
                </div>
              </div>
          </div>
          <div class="resize-triggers">
            <div class="expand-trigger">
              <div style="width: 419px; height: 211px"></div>
            </div>
            <div class="contract-trigger"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { SelectTokenActionFrom, Utils as UniswapUtils, ErrorCodes } from 'uniswap-dapp-integration-shared';
import { default as TokenIcon } from './token-icon.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TokenModal',
  components: {
    TokenIcon
  },
  props: ['logic', 'selectorOpenFrom', 'inputToken', 'outputToken', 'theosLogo', 'maticLogo'],

  data() {
    return {
      searchToken: '',
      SelectTokenActionFrom
    };
  },

  methods: {
    searchForToken() {
      this.logic.searchToken(this.searchToken); // vue updating of the array is a bit nuts so just force it!
      // #notavuedev

      this.$forceUpdate();
    },
    closeTokenSelectorModal() {
      this.logic.hideTokenSelector();
    },
    async changeSelectToken(contractAddress) {
      var _this$outputToken, _this$outputToken2;

      switch (this.selectorOpenFrom) {
        case this.SelectTokenActionFrom.input:
          if (this.inputToken.contractAddress === contractAddress) {
            this.logic.hideTokenSelector();
            return;
          }

          if (((_this$outputToken = this.outputToken) === null || _this$outputToken === void 0 ? void 0 : _this$outputToken.contractAddress) === contractAddress) {
            const swapResponse = await this.logic.swapSwitch();
            this.$emit('switchSwapCompleted', swapResponse);
            this.logic.hideTokenSelector();
            return;
          }

          await this.changeToken(contractAddress);
          return;

        case this.SelectTokenActionFrom.output:
          if (((_this$outputToken2 = this.outputToken) === null || _this$outputToken2 === void 0 ? void 0 : _this$outputToken2.contractAddress) === contractAddress) {
            this.logic.hideTokenSelector();
            return;
          }

          if (this.inputToken.contractAddress === contractAddress) {
            const swapResponse = await this.logic.swapSwitch();
            this.$emit('switchSwapCompleted', swapResponse);
            this.logic.hideTokenSelector();
            return;
          }

          await this.changeToken(contractAddress);
          return;
      }
    },

    async changeToken(contractAddress) {
      try {
        await this.logic.changeToken(contractAddress);
      } catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === ErrorCodes.noRoutesFound) {
          this.$emit('changeTokenCompleted', true);
          return;
        } else {
          throw error;
        }
      }

      this.$emit('changeTokenCompleted', false);
    },

    utils() {
      return UniswapUtils;
    }

  }
});
</script>