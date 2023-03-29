<template>
  <div>
    <div class="ChartType">
      <ul class="ChartType_tab">
        <li
          v-for="(item, index) in ChartType"
          :key="index"
          :class="{ tab_active: tabActive == index }"
          @click="tabActive = index"
        >
          {{ item }}
        </li>
      </ul>
      <div class="flex">
        <!-- <transition name="fade-transform" mode="out-in"> -->
        <keep-alive>
          <component ref="towers" v-bind:is="currentTabComponent"></component>
        </keep-alive>
        <!-- </transition> -->
      </div>
    </div>
  </div>
</template>

<script>
import towerChart from "./components/towerChart.vue";
import ownChart from "./components/ownChart.vue";
export default {
  components: {
    towerChart,
    ownChart,
  },
  data() {
    return {
      ChartType: ["铁塔", "自有", "宏站", "室分"],
      tabActive: 0,
      currentTabComponent: "",
    };
  },
  watch: {
    tabActive: {
      handler(val) {
        if (val == 0) {
          this.currentTabComponent = "towerChart";
        } else if (val == 1) {
          this.currentTabComponent = "ownChart";
        }
      },
      immediate: true,
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.ChartType {
  height: 400px;
  padding: 10px 0px 0px;
  // margin-bottom: 20px;
  background: #fff;
  overflow-y: scroll;
  &_tab {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    // padding: 20px;
    // background: black;
    li {
      text-align: center;
      width: 150px;
      background: #ebf2fa;
      border-radius: 20px;
      margin-right: 30px;
      height: 45px;
      line-height: 45px;
      font-size: 18px;
      // border-radius: 5px 5px 0 0;
      padding-right: 10px;
      color: #415d85;
    }
  }
  .tab_active {
    background: #415d85;
    color: #f5fbfe;
  }
  .flex {
    // display: flex;
    width: 100%;
  }
}
</style>
