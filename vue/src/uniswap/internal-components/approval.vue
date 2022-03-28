<template>  
    <button
      class="uni-ic__swap-allow uni-ic__theme-background-button"
      v-if="
        tradeContext &&
          tradeContext.approvalTransaction &&
          tradeContext.fromBalance &&
          tradeContext.fromBalance.hasEnough
      "
    >
  
      <span
        v-if="
          miningTransaction === undefined ||
            miningTransactionStatus === TransactionStatus.rejected
        "
        >You must give the Sushiswap smart contract permisson to use your
        {{ tradeContext.fromToken.symbol }}. You only have to do this once per
        token per sushiswap version. Please approve permissions.
      </span>
  
      <span
        v-if="
          miningTransactionStatus === TransactionStatus.waitingForConfirmation
        "
        >Waiting for confirmation....</span
      >
      <span v-if="miningTransactionStatus === TransactionStatus.mining"
        >Waiting for your transaction to be mined...
      </span>
    </button>
</template>

<script>
import { default as TokenIcon } from './token-icon.vue';
import { TransactionStatus } from 'uniswap-dapp-integration-shared';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Approval',
  components: {
    TokenIcon
  },
  props: ['logic', 'tradeContext', 'miningTransaction', 'miningTransactionStatus'],

  data() {
    return {
      TransactionStatus
    };
  }

});
</script>