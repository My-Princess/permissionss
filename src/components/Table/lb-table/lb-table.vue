<template>
  <div class="lb-table" :style="{ height: height + 'px' }">
    <el-table
      ref="elTable"
      v-bind="$attrs"
      :data="data"
      element-loading-text="拼命加载中"
      :span-method="this.merge ? this.mergeMethod : this.spanMethod"
      :height="height + 'px'"
      style="width: 100%"
      v-on="$listeners"
    >
      <template v-for="(item, index) in column">
        <lb-column
          v-if="item.label !== '支局'"
          :key="index"
          v-bind="$attrs"
          :column="item"
          :isDg="isDg"
        />
        <lb-column
          v-else-if="isDg === true"
          :key="index"
          v-bind="$attrs"
          :column="item"
        />
      </template>
    </el-table>

    <!-- </div> -->
    <el-pagination
      v-if="pagination"
      class="lb-table-pagination"
      v-bind="$attrs"
      :style="{ 'margin-top': paginationTop, 'text-align': paginationAlign }"
      v-on="$listeners"
      @current-change="paginationCurrentChange"
    />
  </div>
</template>

<script>
import LbColumn from "./lb-column";
export default {
  components: {
    LbColumn
  },
  props: {
    column: Array,
    data: Array,
    isDg: {
      //是否是支局
      type: Boolean,
      default: false
    },
    spanMethod: Function,
    loading: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Boolean,
      default: false
    },
    paginationTop: {
      type: String,
      default: "0px"
    },
    paginationAlign: {
      type: String,
      default: "right"
    },
    merge: Array,
    mergerParame: Array,
    noHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      mergeLine: {},
      mergeIndex: {},
      height: 0
    };
  },
  computed: {
    dataLength() {
      return this.data.length;
    }
  },
  watch: {
    merge() {
      this.getMergeArr(this.data, this.merge, this.mergerParame);
    },
    dataLength() {
      this.getMergeArr(this.data, this.merge, this.mergerParame);
    }
  },
  created() {
    this.getMergeArr(this.data, this.merge, this.mergerParame);
  },
  mounted() {
    //   this.$nextTick(() => {
    //   console.log("mounted");
    //   if (!this.$refs.elTable.$el.offsetParent) return;
    //   this.height =
    //     window.innerHeight -
    //     this.$refs.elTable.$el.offsetParent.offsetTop -
    //     120;
    //   console.log("height", this.height);
    // });
  },
  updated() {
    console.log("updated",this.noHeight);
    if (this.noHeight) {
      this.height = this.noHeight
    } else {
      this.$nextTick(() => {
        // console.log("按下", this.$refs.elTable.$el.offsetParent);
        if (!this.$refs.elTable.$el.offsetParent) return;
        this.height =
          window.innerHeight - this.$refs.elTable.$el.offsetParent.offsetTop -120;
        // console.log("height", this.height);
      });

      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        // if(!self.$refs.elTable.$el.offsetParent.offsetTop) return
        // console.log("按下1", self.$refs.elTable.$el.offsetParent.offsetTop);
        self.height =
          window.innerHeight -
          self.$refs.elTable.$el.offsetParent.offsetTop -
          120;
      };
    }

    // window.onresize = ()=>{
    //   return (()=>{
    //     this.height =  window.innerHeight - this.$refs.elTable.$el.offsetParent.offsetTop
    //   })
    // }
  },
  methods: {
    clearSelection() {
      this.$refs.elTable.clearSelection();
    },
    toggleRowSelection(row, selected) {
      this.$refs.elTable.toggleRowSelection(row, selected);
    },
    toggleAllSelection() {
      this.$refs.elTable.toggleAllSelection();
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.elTable.toggleRowExpansion(row, expanded);
    },
    setCurrentRow(row) {
      this.$refs.elTable.setCurrentRow(row);
    },
    clearSort() {
      this.$refs.elTable.clearSort();
    },
    clearFilter(columnKey) {
      this.$refs.elTable.clearFilter(columnKey);
    },
    doLayout() {
      this.$refs.elTable.doLayout();
    },
    sort(prop, order) {
      this.$refs.elTable.sort(prop, order);
    },
    paginationCurrentChange(val) {
      this.$emit("p-current-change", val);
    },
    getMergeArr(tableData, merge, mergerParame) {
      if (!merge) return;
      console.log("进getMergeArr");
      this.mergeLine = {};
      this.mergeIndex = {};
      merge.forEach((item, k) => {
        tableData.forEach((data, i) => {
          if (i === 0) {
            this.mergeIndex[item] = this.mergeIndex[item] || [];
            this.mergeIndex[item].push(1);
            this.mergeLine[item] = 0;
          } else {
            if (mergerParame == null || mergerParame.length === 0) {
              if (data[item] === tableData[i - 1][item]) {
                this.mergeIndex[item][this.mergeLine[item]] += 1;
                this.mergeIndex[item].push(0);
              } else {
                this.mergeIndex[item].push(1);
                this.mergeLine[item] = i;
              }
            } else {
              let bool = true;
              mergerParame.forEach((parame, k) => {
                if (
                  data[parame] !== tableData[i - 1][parame] ||
                  data[item] !== tableData[i - 1][item]
                ) {
                  bool = false;
                }
              });
              if (bool) {
                this.mergeIndex[item][this.mergeLine[item]] += 1;
                this.mergeIndex[item].push(0);
              } else {
                this.mergeIndex[item].push(1);
                this.mergeLine[item] = i;
              }
            }
          }
        });
      });
    },
    mergeMethod({ row, column, rowIndex, columnIndex }) {
      const index = this.merge.indexOf(column.property);
      if (index > -1) {
        const _row = this.mergeIndex[this.merge[index]][rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    }
  }
};
</script>
<style lang="scss">
.lb-table {
  /* display: flex; */
  // height: 340px;
  /* // width: 100%;
  // flex-direction: column;
  // flex: 1;
  // overflow: hidden; */

  flex: 1;
  min-height: 100px;
  position: relative;
  display: flex;
  flex-direction: column;

  /* // .el-table{
  // flex:1
  // } */
}
.panel-table__table .lb-table {
  flex: 1;
}
</style>
