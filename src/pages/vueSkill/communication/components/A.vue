<template>
  <div>
    <div>组件A</div>
    <B :foo="foo" :bar="bar"  @upFoo="update"></B>
  </div>
</template>
​
<script>
import B from "./B.vue";
export default {
  components: {
    B,
  },
  data() {
    return {
      foo: "foo",
      bar: "bar",
    };
  },
    methods: {
    update(val) {
      this.foo = val;
      console.log("update success");
    },
  },
};
</script>
