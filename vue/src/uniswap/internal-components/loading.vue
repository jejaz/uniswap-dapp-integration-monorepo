<!--<template>  -->
<!--    <div class="uni-ic__loading">-->
<!--      <svg-->
<!--        class="uni-ic__loading__svg-container"-->
<!--        height="100"-->
<!--        width="100"-->
<!--        viewBox="0 0 100 100"-->
<!--      >-->
<!--        <circle class="uni-ic__loading__svg bg" cx="50" cy="50" r="45"></circle>-->
<!--        <circle-->
<!--          class="uni-ic__loading__svg animate"-->
<!--          cx="50"-->
<!--          cy="50"-->
<!--          r="45"-->
<!--        ></circle>-->
<!--      </svg>-->
<!--    </div>-->
<!--</template>-->

<template>
  <div class="loader-wrapper">
    <div
      class="loader change-border"
    ></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Loading'
});
</script>