<template>
  <div class="tower">
    <div class="tower-l">
      <div class="tower-table">
        <div class="herder">全省 202206</div>
        <div class="c">
          <!-- <div class="c-row"
               v-for="(item, index) in tableData"
               :key="index">
            <div class="c-col">{{ item.name }}</div>
            <div class="c-col">{{ item.num }}</div>
          </div> -->
          <lb-table
           ref="listTable"
            v-loading="tableData.loading"
            :column="tableData.column"
            :data="tableData.data"
            background
            border
            :show-header="false"
            @selection-change="changeFun"
          />
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
// import echarts from "echarts";
import * as echarts from "echarts";
import lbTable from "@/components/Table/lb-table/lb-table";
export default {
  components: { lbTable },
  data() {
    return {
      tableData: {
        column: [
          {
            prop: "selection",
            type: "selection",
            align: "center",
          },
          // {
          //   prop: "radio",
          //   align: "center",
          //   minWidth: 50,
          //   render: (h, scope, index) => {
          //     return (
          //       <el-radio
          //         label={scope.$index}
          //         v-model={this.radioId}
          //         onChange={() => {
          //           this.onChange(scope);
          //         }}
          //       ></el-radio>
          //     );
          //   },
          // },
          {
            prop: "name",
            label: "",
            minWidth: 160,
            align: "center",
          },
          {
            prop: "num",
            label: "",

            minWidth: 160,
            align: "center",
          },
        ],
        data: [],
        loading: false,
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      tableDatas: [
        { radio: false, name: "转供电数量(站址)", num: 22 },
        { radio: false, name: "转供电数量(电表)", num: 33444 },
        { radio: false, name: "转供平均单价(报账单)", num: 5555 },
        { radio: false, name: "专供电平均加价比例(报账单)", num: 5555 },
        { radio: false, name: "新建站专供电数量(站址)", num: 5555 },
        { radio: false, name: "新建站专供电数量(站址)", num: 5555 },
        { radio: false, name: "新建站转供电数量(电表)", num: 5555 },
      ],
      yData: [
        0, 0.2, 0.4, 0.6, 0.8, 1, 0, 0.8, 0.1, 0.6, 0.5, 0.2, 0.5, 0.2, 0.1,
        0.6, 0.3, 1, 0.5, 0.9, 0.2,
      ],
      xData: [
        "深圳",
        "广州",
        "东莞",
        "佛山",
        "中山",
        "惠州",
        "江门",
        "汕头",
        "珠海",
        "湛江",
        "茂名",
        "揭阳",
        "肇庆",
        "清远",
        "梅州",
        "潮州",
        "韶关",
        "河源",
        "汕尾",
        "阳江",
        "云浮",
      ],
      multipleSelection: [],
      radioId: null,
      SelectRadio:{name:"",num:""}
    };
  },
  mounted() {
    this.tableData.data = this.tableDatas;
    this.$nextTick(() => {
      this.initChart();
    });
  },
  activated() {
  console.log("我是activated钩子");
},
deactivated() {
  console.log("我是deactivated钩子");
},
  methods: {
    onChange(row) {
      // let radio =  row.row.radio
      this.radioId = row.$index;
      console.log("e", row);
    },
    initChart() {
      console.log("wwww");
      var myChart = echarts.init(document.getElementById("productbar"));
      var myChart1 = echarts.init(document.getElementById("towerLine"));
      myChart.resize();
      myChart1.resize();
      var option = {
        title: {
          text: "全省站址数量统计",
        },
        legend: {
          data: ["站址数量"],
          top: "15", // 设置图例位置在顶部
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
            // barWidth: 25,//不限定是自动适应
            barMaxWidth: 46,
            barCategoryGap: "40%",
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
        },
        legend: {
          data: ["站址数量"],
          top: "15", // 设置图例位置在顶部
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
    changeFun(val) {
      // this.multipleSelection = val;
      // console.log("ss",val)
      if (val.length > 1) {
        this.$refs.listTable.clearSelection();
        this.$refs.listTable.toggleRowSelection(val.pop());
        return;
      }
      // console.log("val",val)
      		if(val[0]){
            console.log("222")
					this.SelectRadio.name = val[0].name;
					this.SelectRadio.num = val[0].num;
               console.log("1",this.SelectRadio)
				}else{
					this.SelectRadio.name = '';
					this.SelectRadio.num = 0;
				}
      this.multipleSelection = val
 
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
        font-size: 24px;
        text-align: center;
        background-image: linear-gradient(to right, #517cc6, #527cc6);
        color: #fff;
        font-weight: bold;
      }
      .c {
        font-size: 18px;
        line-height: 38px;
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
          line-height: 3 8px;
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
