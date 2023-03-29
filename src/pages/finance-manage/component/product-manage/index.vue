<template>
  <div class="app-container">
    <el-form ref="element" class="filter-container">
      <div class="ub">
        <div class="mr-20">
          <el-form-item class="inputTitle" label="地市:">
            <el-select
              v-model="editForm.cityId"
              clearable
              :disabled="userLevel >= 0"
              @change="selectArea(editForm.cityId, 1)"
            >
              <el-option
                v-for="(item, index) in cityOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="mr-20">
          <el-form-item label="区县:">
            <el-select
              v-model="editForm.substId"
              clearable
              :disabled="userLevel >= 2"
              @change="selectArea(editForm.substId, 2)"
            >
              <el-option
                v-for="(item, index) in substOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="mr-20">
          <el-form-item label="营服:">
            <el-select
              v-model="editForm.branchId"
              clearable
              :disabled="userLevel >= 3"
              @change="selectArea(editForm.branchId, 3)"
            >
              <el-option
                v-for="(item, index) in branchOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="mr-20">
          <el-form-item label="片区:">
            <el-select
              v-model="editForm.areaId"
              clearable
              :disabled="userLevel > 4 || (isDg && userLevel > 5)"
              @change="selectArea(editForm.areaId, 5)"
            >
              <el-option
                v-for="(item, index) in areaOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="mr-20">
          <!-- <el-form-item label="网格ID:">
            <el-select
              v-model="editForm.cellId"
              clearable
              :disabled="userLevel > 5 || (isDg && userLevel > 6)"
            >
              <el-option
                v-for="item in gridOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item> -->
        </div>
      </div>
      <div>
        <el-form-item label="时间筛选:">
          <el-date-picker
            v-model="editForm.startDate"
            class="dataPadding"
            type="date"
            value-format="yyyy-MM-dd"

          />
          -
          <el-date-picker
            v-model="editForm.endDate"
            class="dataPadding"
            type="date"
            value-format="yyyy-MM-dd"

          />
        </el-form-item>
      </div>
      <el-row>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
          >查询</el-button
        >
        <el-button
          class="filter-item mr-20"
          type="primary"
          icon="el-icon-download"
          @click="getExportDataTableClick"
          >导出</el-button
        >
        <el-checkbox v-model="isSelectAll" @change="handleCheckAllChange" label="全选" />
      </el-row>

      <!-- <el-checkbox v-model="isSelectAll" label="全选" /> -->
    </el-form>
    <lb-table
      ref="qzhzStoresTable"
      v-loading="tableData.loading"
      :column="tableData.column"
      :data="tableData.data"
      :isDg="isDg"
      :height="'400px'"
      pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      border
      :page-sizes="[10, 30, 50, 100, 200]"
      :pager-count="5"
      :current-page.sync="tableData.currentPage"
      :total="tableData.total"
      :page-size="tableData.pageSize"
      @size-change="handleSizeChange"
      @p-current-change="handleCurrentChange"
      @selection-change="changeFun"
    />

    <el-image-viewer
      v-if="isImageShow"
      :on-close="closeViewer"
      :url-list="imgUrl"
      fit="cover"
    />
  </div>
</template>

<script>
import API from "@/api/api";
import lbTable from "@/components/Table/lb-table/lb-table";
import { myMixin } from "@/mixin/mechanism";
export default {
  name: "qzhzStores",
  mixins: [myMixin],
  data() {
    return {
      editForm: {
        cityId: "",
        substId: "",
        branchId: "",
        areaId: "",
        startDate:"",
        endDate:"",
        // cellId: ""
      },
      tableData: {
        column: [
          { type: "selection", align: "center" },
          {
            type: "index",
            align: "center",
            label: "序号",
            minWidth: 110,
            render: (h, scope, index) => {
              return (
                <span>
                  {(this.tableData.currentPage - 1) * this.tableData.pageSize +
                    scope.$index +
                    1}
                </span>
              );
            }
          },
          {
            prop: "cityName",
            label: "地市",
            align: "center",
            minWidth: 110
          },
          {
            prop: "substName",
            align: "center",
            label: "区县",
            minWidth: 110
          },
          {
            prop: "branchName",
            align: "center",
            label: "营服",
            minWidth: 110
          },
          {
            prop: "areaName",
            align: "center",
            label: "片区",
            minWidth: 110
          },
          {
            prop: "pocooStoresName",
            align: "center",
            label: "潜在合作门店"
            // minWidth: 110
          },
          {
            prop: "friendCooInformation",
            align: "center",
            label: "友商合作信息",
            minWidth: 110
          },
          {
            prop: "pocooStoresType",
            align: "center",
            label: "门店类型",
            minWidth: 110
          },
          {
            prop: "informationTbPeople",
            align: "center",
            label: "信息填报人",
            minWidth: 110
          },
          {
            prop: "informationTbPeopleNum",
            align: "center",
            label: "信息填报人手机号码",
            minWidth: 110
          },
          // {
          //   prop: "chnlResponName",
          //   align: "center",
          //   label: "承包/责任渠道名称",
          //   minWidth: 110
          // },
          // {
          //   prop: "friendCooAttribute",
          //   align: "center",
          //   label: "友商信息属性",
          //   minWidth: 110
          // },
          {
            prop: "storesAddrId",
            align: "center",
            label: "门店地址id",
            minWidth: 110
          },
          {
            prop: "storesAddrName",
            align: "center",
            label: "门店地址名称",
            minWidth: 110
          },
          {
            prop: "storesX",
            align: "center",
            label: "门店X坐标",
            minWidth: 110
          },
          {
            prop: "storesY",
            align: "center",
            label: "门店Y坐标",
            minWidth: 110
          },
          {
            prop: "storesArea",
            align: "center",
            label: "门店面积㎡",
            minWidth: 110
          },
          {
            prop: "storesAvgSalesCnt",
            align: "center",
            label: "门店月均移动销量",
            minWidth: 120
          },
          {
            prop: "storesAvgMbSalesCnt",
            align: "center",
            label: "门店月均手机终端销量",
            minWidth: 130
          },
          {
            prop: "storesCreateDate",
            align: "center",
            label: "门店信息创建时间",
            minWidth: 110
          },
          {
            prop: "storesStatus",
            align: "center",
            label: "门店状态",
            minWidth: 110
          },

          {
            prop: "channelName",
            align: "center",
            label: "电信销售点名称",
            minWidth: 110
          },
          {
            prop: "channelNbr",
            align: "center",
            label: "电信销售点编码",
            minWidth: 110
          },
          {
            prop: "storesFacePhoto",
            align: "center",
            label: "门店正面照片",
            minWidth: 110,
            render: (h, scope, index) => {
              return (
                <el-button
                  disabled={
                    !scope.row.storesFacePhoto ||
                    !scope.row.storesFacePhoto.length
                  }
                  onClick={() => {
                    this.showImg(scope.row);
                  }}
                >
                  查看图片
                </el-button>
              );
            }
          }
        ],
        data: [],
        loading: false,
        currentPage: 1,
        pageSize: 30,
        total: 0
      },
      tabColumn: {
        column: []
      },
      imgUrl: [],
      isImageShow: false, // 查看图片

      selectAllParame: {},
      userLevel: "",
      multipleSelection: [],
      isSelectAll: false, // 是否全选
      exportExcelName: "潜在合作门店"
    };
  },

  components: {
    lbTable,
    "el-image-viewer": () =>
      import("element-ui/packages/image/src/image-viewer")
  },
  watch: {

  },
  mounted() {
    let tabledata = this.tableData.column.slice(
      1,
      this.tableData.column.length - 1
    );
    console.log("tabledata", tabledata);
    this.tabColumn.column = [...this.tabColumn.column, ...tabledata];
  },
  created() {},
  methods: {
    changeTableByISelectAll() {
      this.tableData.data.forEach(item => {
        this.$refs.qzhzStoresTable.toggleRowSelection(item, this.isSelectAll);
      });
    },
    handleFilter() {
      if (this.userInfo.multiArea == "1" && this.editForm.areaId == "") {
        this.$message({
          showClose: true,
          message: "请选择片区",
          type: "warning"
        });
        return;
      }

      var parame = { ...this.editForm };
      if (parame.cityId) {
        this.tableData.loading = true;
        parame.pageNum = this.tableData.currentPage;
        parame.pageSize = this.tableData.pageSize;
        parame.cityId = parame.cityId.substring(0, 3);
        // parame.username = this.userInfo.username;
        delete parame.gridId;

        this.selectAllParame = { ...parame };
        API.qzhzstores(parame)
          .then(response => {
            try {
              const data = response.data;
              this.tableData.data = data.list;
              this.tableData.total = data.total;
              this.tableData.loading = false;
              //   this.isSelectAll = false;
            } catch (err) {
              console.log("err", err);
              this.$message({
                showClose: true,
                message: response.reason,
                type: "warning"
              });
              this.tableData.loading = false;
            }
            // console.log(data)
          })
          .catch(response => {
            this.tableData.loading = false;
            this.$message({
              showClose: true,
              message: "服务查询超时,请联系厂家处理",
              type: "warning"
            });
            this.tableData.data = [];
            console.log("error:", response);
          });
      } else {
        this.$message({
          showClose: true,
          message: "请选择地市",
          type: "warning"
        });
      }
    },

    getExportDataTableClick(Arr, isAll) {
      if (!this.tableData.data.length) {
        this.$message({
          showClose: true,
          message: "导出数据为空",
          type: "warning"
        });
        return;
      }
      if (!this.isSelectAll) {
        this.selectExportDataTable();
      } else {
        this.AllExportDataTable();
      }
    },
    AllExportDataTable() {
      this.tableData.loading = true;
      var parame = { ...this.editForm };

      var formData = new FormData();
      formData.append("username", this.userInfo.username);
      formData.append("cityId", parame.cityId.substring(0, 3));
      formData.append("substId", parame.substId);
      formData.append("branchId", parame.branchId);
      formData.append("areaId", parame.areaId);
      formData.append("startDate", parame.startDate);
      formData.append("endDate", parame.endDate);
      // formData.append("isSelectAll", isAll);

      API.qzhzstoresExport(formData).then(response => {
        this.tableData.loading = false;
        if (response.type === "application/json") {
          this.$message({
            showClose: true,
            message: "服务查询超时,请联系厂家处理",
            type: "warning"
          });
        } else {
          const blob = new Blob([response], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          });
          // let fileName = Date.parse(new Date()) + '.xlsx' //指定下载的文件格式
          const fileName = this.exportExcelName + ".xlsx"; // 指定下载的文件格式
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName);
          } else {
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            // 释放内存
            window.URL.revokeObjectURL(link.href);
          }
        }
      });
    },
    showImg(e) {
      let array = e.storesFacePhoto.split(",");

      this.imgUrl = array;
      this.isImageShow = true;
    },
    // 关闭图片预览
    closeViewer() {
      this.isImageShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/common.scss";
@import "~@/styles/tableCommon.css";
</style>
<style>
.el-form-item__content {
  display: flex;
}

.el-form-item__label {
  /* width: 100px; */
  font-size: 14px;
  color: #1f2d3d;
  font-weight: normal;
}
.el-form-item {
  margin-bottom: 0px;
}
</style>
