<template>
  <div id="app">
     
    <keep-alive>
      <router-view ></router-view>
    </keep-alive>

  
    <!-- <orderList v-show="this.$route.name == 'printReportShow'"></orderList> -->
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: "app",
  // components: { printReportShow },
  data() {
    return {
      status: true,
      componentsArr: [],
       iframeArr:[],
    };
  },
  watch: {

  },
  created() {

    // const componentsArr = this.getComponentsArr();
  },


  mounted() {

  },
  methods: {

  },
};
</script>

<style lang="scss">
#app {
  height: 100%;
  > div {
    height: 100%;
  }
}
</style>
