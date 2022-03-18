<template>  
    <div>
      <img
        :src="logo"
        v-bind:class="classes"
      />
      <div
        v-if="context.isSvg"
        v-bind:class="classes"
        v-html="logo"
      ></div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TokenIcon',
  props: ['classes', 'context', 'logo']
});
</script>