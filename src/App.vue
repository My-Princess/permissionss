<template>
  <div id="app">
    <span>短刀</span>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "app",
  components: {},
  data(){
    return{}
  },
  mounted(){
    //  const { t } = useI18n()
  }
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
