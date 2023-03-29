<template>
  <div class="tower">

    <div class="tower-l">
      <div class="tower-table">
        <div class="herder">全省 202206</div>
        <div class="c">
          <div class="c-row" v-for="(item, index) in tableData" :key="index">
            <div class="c-col">{{ item.name }}</div>
            <div class="c-col">{{ item.num }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tower-r">
      <div
        id="productbar"
        style="width: 95%; height: 250px; margin: auto"
      ></div>
      <div id="towerLine" style="width: 95%; height: 250px; margin: auto"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
  
      tableData: [
        { name: "转供电数量(站址)", num: 22 },
        { name: "转供电数量(电表)", num: 33444 },
        { name: "转供平均单价(报价)", num: 5555 },
      ],
      yData: [0, 0.2, 0.4, 0.6, 0.8, 1],
      xData: [0, 0.2, 0.4, 0.6, 0.8, 1],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    initChart() {
      console.log("wwww");
      var myChart = echarts.init(document.getElementById("productbar"));
      var myChart1 = echarts.init(document.getElementById("towerLine"));
      myChart.resize();
      myChart1.resize();
      var option = {
        title: {
          text: "全省站址数量统计",
          left: "center",
        },
        legend: {
          data: ["站址数量"],
          // top: "15" // 设置图例位置在顶部
          left: "right",
        },
        color: ["#5a5bde", "#2ccd8b"],
        grid: {
          top: 50,
          left: "15%",
          right: "5%",
          bottom: 40,
        },
        xAxis: {
          type: "category",
          data: this.xData,
          axisLine: {
            lineStyle: {
              color: "#c6cfd8 ",
            },
          },
          axisLabel: {
            color: "#455264",
            fontFamily: "arial ",
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: "#dfe6ec ",
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#c6cfd8 ",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#455264",
            fontFamily: "arial ",
          },
        },
        series: [
          {
            type: "bar", //形状为柱状图
            data: this.yData,
            name: "站址数量", // legend属性
            // barWidth: 10,
            // barMaxWidth: 46,
            barCategoryGap: "30%",
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: "top",
            },
          },
        ],
      };

      var option1 = {
        title: {
          text: "全省站址数量统计",
          left: "center",
        },
        legend: {
          data: ["站址数量"],
          // top: "15" // 设置图例位置在顶部
          left: "right",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "站址数量",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
          },
        ],
      };

      myChart.setOption(option);
      myChart1.setOption(option1);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
        myChart1.resize();
      });
      // window.resize()
    },
  },
};
</script>

<style lang="scss" scoped>
.tower {
  padding: 30px 20px 0px;
  width: 100%;
  //   height: 400px;
  display: flex;
  //   background: red;
  &-l {
    width: 40%;
    // background: pink;
    .tower-table {
      position: relative;
      width: 100%;
      margin: auto;
      .herder {
        line-height: 50px;
        height: 50px;
        font-size: 18px;
        text-align: center;
        background-image: linear-gradient(to right, #517cc6, #527cc6);
        color: #fff;
        font-weight: b;
      }
      .c {
        &-row {
          display: flex;
          height: 38px;
          align-items: center;
          border: 1px solid #ccc;
          border-bottom: none;
        }
        &-row:last-child {
          border-bottom: 1px solid #ccc;
        }
        &-col {
          width: 50%;
          height: 100%;
          line-height: 38px;
          text-align: center;
          border-right: 1px solid #ccc;
          // border-bottom: 1px solid #ccc;
        }
        &-col:last-child {
          border-right: none;
        }
      }
    }
  }
  &-r {
    flex: 1;
    // position: relative;
    width: 60%;
    // background: red;
  }
}
</style>
