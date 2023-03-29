<template>
  <div>
    <div>组件B</div>
    <p>foo:{{ foo }}</p>
    <p>attrs:{{ $attrs }}</p>
    <C v-bind="$attrs" v-on="$listeners"></C>
  </div>
</template>

<script>
import C from "./cc.vue";
export default {
  components: { C },
  props: ["foo"],
  // inheritAttrs: false ,
};
</script>

<style></style>
