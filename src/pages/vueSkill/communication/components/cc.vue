<template>
  <div>
    <div>组件C</div>
    <div>attrs:{{ $attrs }}</div>
    <!-- <div>bar:{{bar}}</div> -->
    <button @click="startUpFoo">我要更新foo</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    startUpFoo() {
      this.$emit("upFoo", "foooooooooooo");
      console.log("startUpFoo");
    },
  },
};
</script>
