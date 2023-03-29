<template>
  <div>
    父类：{{ this.a }} <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      a: 6,
      title: "",
    };
  },

  created() {
    console.log("base", this.a);
  },
  computed: {},

  mounted() {},

  methods: {
    add() {
      console.log("父类方法");
    },
  },
};
</script>

<style></style>
