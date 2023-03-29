<template>
  <div>
    <el-button @click="exports()">导出</el-button>
    <el-button @click="exportExcel1()" :loading="btnLoading"
      >导出excel</el-button
    >
    <!-- <iframe src="http://172.16.153.68:8080/fff.html" frameborder="0"></iframe> -->

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
    />
  </div>
</template>

<script>
import lbTable from "@/components/Table/lb-table/lb-table";

export default {
  name: "printReportShow",
  components: {
    lbTable,
  },
  data() {
    return {
      tableData: {
        column: [
          //基本信息
          {
            label: "基本信息",
            align: "center",
            children: [
              {
                prop: "companyName",
                align: "center",
                label: "公司名称",
                minWidth: 110,
              },
              { prop: "addr", align: "center", label: "地址", minWidth: 110 },
              {
                prop: "industry",
                align: "center",
                label: "所属行业",
                minWidth: 110,
              },
              {
                prop: "mainBus",
                align: "center",
                label: "主营业务",
                minWidth: 110,
              },
              {
                prop: "isBranch",
                align: "center",
                label: "是否有分支机构",
                minWidth: 110,
              },
              {
                prop: "branchSpread",
                align: "center",
                label: "分支机构分布",
                minWidth: 110,
              },
              {
                prop: "staffNum",
                align: "center",
                label: "员工规模",
                minWidth: 110,
              },
              {
                prop: "officeStaffNum",
                align: "center",
                label: "其中办公室人员",
                minWidth: 110,
              },
              {
                prop: "linkMan",
                align: "center",
                label: "联系人",
                minWidth: 110,
              },
              {
                prop: "linkPhone",
                align: "center",
                label: "联系方式",
                minWidth: 110,
              },
            ],
          },
          // 办公网络
          {
            label: "办公网络",
            align: "center",
            children: [
              {
                prop: "pcNum",
                align: "center",
                label: "办公电脑数量",
                minWidth: 110,
              },
              {
                prop: "isNetwork",
                align: "center",
                label: "是否有组网|跨境上网需求",
                minWidth: 110,
                renderHeader: this.renderheader,
              },
              {
                label: "电信网络",
                align: "center",
                children: [
                  {
                    prop: "isRate",
                    align: "center",
                    label: "速率是否满足",
                    minWidth: 110,
                  },
                  {
                    prop: "usePerception",
                    align: "center",
                    label: "客户使用感知",
                    minWidth: 110,
                  },
                  {
                    prop: "unsatisfyInfo",
                    align: "center",
                    label: "不满意的原因",
                    minWidth: 110,
                  },
                ],
              },
              {
                label: "其他运营商网络",
                align: "center",
                children: [
                  {
                    prop: "isOtherOper",
                    align: "center",
                    label: "是否有其他运营商网络",
                    minWidth: 110,
                  },
                  {
                    prop: "otherOper",
                    align: "center",
                    label: "运营商",
                    minWidth: 110,
                  },
                  {
                    prop: "ywNettype",
                    align: "center",
                    label: "网络类型",
                    minWidth: 110,
                  },
                  {
                    prop: "ywUsePerception",
                    align: "center",
                    label: "使用是否满意",
                    minWidth: 110,
                  },
                  {
                    prop: "ywNum",
                    align: "center",
                    label: "数量",
                    minWidth: 110,
                  },
                  {
                    prop: "ywMonthFee",
                    align: "center",
                    label: "月消费",
                    minWidth: 110,
                  },
                  {
                    prop: "ywExpiredate",
                    align: "center",
                    label: "合同到期日期",
                    minWidth: 110,
                  },
                ],
              },
            ],
          },
          // 机房情况
          {
            label: "机房情况",
            align: "center",
            children: [
              {
                prop: "isFacility",
                align: "center",
                label: "是否有机房",
                minWidth: 110,
              },
              {
                prop: "facUseage",
                align: "center",
                label: "机房使用年限",
                minWidth: 110,
              },
              {
                prop: "facStation",
                align: "center",
                label: "机房运维现状",
                minWidth: 110,
              },
              {
                prop: "outLevprot",
                align: "center",
                label: "机房是否过等保",
                minWidth: 110,
              },
              {
                prop: "isLevprot",
                align: "center",
                label: "是否有等保需求",
                minWidth: 110,
              },
              {
                prop: "isExpand",
                align: "center",
                label: "是否有扩容需求",
                minWidth: 110,
              },
            ],
          },
          // 系统情况
          {
            label: "系统情况",
            align: "center",
            children: [
              {
                prop: "usingSystem",
                align: "center",
                label: "目前在用系统",
                minWidth: 110,
              },
              {
                prop: "newSystemOnline",
                align: "center",
                label: "最近是否有新系统上线",
                minWidth: 110,
              },
            ],
          },
          //云业务情况
          {
            label: "云业务情况",
            align: "center",
            children: [
              {
                prop: "cloudPro",
                label: "目前在用的云服务提供商是",
                align: "center",
                minWidth: 110,
              },
              {
                prop: "isCloud",
                label: "近期是否有购买或采用云服务的需求",
                align: "center",
                minWidth: 110,
              },
            ],
          },
          // 宿舍情况
          {
            label: "宿舍情况",
            align: "center",
            children: [
              {
                prop: "dormNum",
                align: "center",
                label: "宿舍规模",
                minWidth: 110,
              },
              {
                prop: "dormPeonum",
                align: "center",
                label: "住宿人数",
                minWidth: 110,
              },
              {
                label: "宿舍网络情况",
                align: "center",
                children: [
                  {
                    prop: "isDormNet",
                    align: "center",
                    label: "宿舍是否可以接入网络",
                    minWidth: 110,
                  },
                  {
                    prop: "netpay",
                    align: "center",
                    label: "付费方式",
                    minWidth: 110,
                  },
                  {
                    prop: "subPernum",
                    align: "center",
                    label: "月消费",
                    minWidth: 110,
                  },
                  {
                    prop: "dormOper",
                    align: "center",
                    label: "使用运营商",
                    minWidth: 110,
                  },
                  {
                    prop: "accType",
                    align: "center",
                    label: "接入模式",
                    minWidth: 110,
                  },
                ],
              },
            ],
          },

          // 员工手机
          {
            label: "员工手机",
            align: "center",
            children: [
              {
                label: "宿舍网络情况",
                align: "center",
                children: [
                  {
                    prop: "isComsub",
                    align: "center",
                    label: "是否有通讯补贴",
                    minWidth: 110,
                  },
                  {
                    prop: "subPernum",
                    align: "center",
                    label: "补贴人数",
                    minWidth: 110,
                  },
                  {
                    prop: "subSum",
                    align: "center",
                    label: "补贴金额(元/月)",
                    minWidth: 110,
                  },
                  {
                    prop: "subType",
                    align: "center",
                    label: "补贴方式",
                    minWidth: 110,
                  },
                ],
              },
              {
                label: "移动对公开户情况(其他运营商)",
                align: "center",
                children: [
                  {
                    prop: "isPub",
                    align: "center",
                    label: "是否有对公开户移动",
                    minWidth: 110,
                  },
                  {
                    prop: "pubOper",
                    align: "center",
                    label: "运营商",
                    minWidth: 110,
                  },
                  {
                    prop: "pubNum",
                    align: "center",
                    label: "数量",
                    minWidth: 110,
                  },
                  {
                    prop: "pubRent",
                    align: "center",
                    label: "月租",
                    minWidth: 110,
                  },
                  {
                    prop: "isEndsub",
                    align: "center",
                    label: "是否有终端补贴",
                    minWidth: 110,
                  },
                  {
                    prop: "endsubSum",
                    align: "center",
                    label: "终端补贴金额",
                    minWidth: 110,
                  },
                  {
                    prop: "endsubExpiredate",
                    align: "center",
                    label: "终端补贴到期日期",
                    minWidth: 110,
                  },
                ],
              },
            ],
          },

          {
            prop: "custInfo",
            label: "客情信息及其它信息",
            align: "center",
            minWidth: 110,
          },
        ],
        data: [],
        loading: false,
        currentPage: 1,
        pageSize: 50,
        total: 0,
      },
      isDg: false,
      maxlevel: 0,
      mm: [],
      exportSumId: [],
      btnLoading: false,
      levelArr: [],
      Cell: [],
      char: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "AA",
        "AB",
        "AC",
        "AD",
        "AE",
        "AF",
        "AG",
        "AH",
        "AI",
        "AJ",
        "AK",
        "AL",
        "AM",
        "AN",
        "AO",
        "AP",
        "AQ",
        "AR",
        "AS",
        "AT",
        "AU",
        "AV",
        "AW",
        "AX",
        "AY",
        "AZ",
        "BA",
        "BB",
        "BC",
        "BD",
        "BE",
        "BF",
        "BG",
        "BH",
        "BI",
        "BJ",
        "BK",
        "BL",
        "BM",
        "BN",
        "BO",
        "BP",
        "BQ",
        "BR",
        "BS",
        "BT",
        "BU",
        "BV",
        "BW",
        "BX",
        "BY",
        "BZ",
      ],
      sheetHead: [
        {
          id: "ee",
          pid: "root",
          label: "日期",
          prop: "date",
        },
        {
          id: "ww",
          pid: "root",
          label: "配送信息",
          children: [
            {
              id: "eee",
              pid: "ww",
              label: "姓名",
              prop: "name",
            },
            {
              id: "ddd",
              pid: "ww",
              label: "省份",
              prop: "province",
            },
            {
              id: "wewewe",
              pid: "ww",
              label: "详细信息",
              children: [
                {
                  id: "ddd",
                  pid: "wewewe",
                  label: "市区",
                  prop: "city",
                },
                {
                  id: "ssssss",
                  pid: "wewewe",
                  label: "地址",
                  prop: "address",
                },
                {
                  id: "rrrrr",
                  pid: "wewewe",
                  label: "邮编",
                  prop: "zip",
                },
              ],
            },
          ],
        },
        {
          id: "wewewqeqwe",
          pid: "root",
          label: "日期",
          prop: "date",
        },
        {
          id: "weqwewq",
          pid: "root",
          label: "配送信息",
          children: [
            {
              id: "ewqewewq",
              pid: "weqwewq",
              label: "姓名",
              prop: "name",
            },
            {
              id: "weqdsdfs",
              pid: "weqwewq",
              label: "省份",
              prop: "province",
            },
            {
              id: "sdsfsdfas",
              pid: "weqwewq",
              label: "详细信息",
              children: [
                {
                  id: "cccvvsad",
                  pid: "sdsfsdfas",
                  label: "市区",
                  prop: "city",
                },
                {
                  id: "sdasdsdccc",
                  pid: "sdsfsdfas",
                  label: "地址",
                  prop: "address",
                },
                {
                  id: "fggfgdfgf",
                  pid: "sdsfsdfas",
                  label: "邮编",
                  prop: "zip",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  mounted() {},
  methods: {
    exportExcel() {
      this.btnLoading = true; // 设置之后，在下载完成之后按钮不可点，防止重复点击
      // @/utils/Export2Excel为文件所放置的位置，直接引入使用
      import("@/vendorcheck/Export2Excel2").then((excel) => {
        let transTable = this.$refs.qzhzStoresTable.column; // 获取最新表格数据
        console.log("qzhzStoresTable", this.$refs.qzhzStoresTable);
        let filterVal = [
          // 对应的字段，与下文中header字段相对应
          "title1",
          "title2",
          "title3",
          "title4",
          "title5",
          "title6",
          "title7",
          "title8",
          "title9",
          "title10",
        ];
        const data = this.formatJson(filterVal, []); // 处理数据
        excel.export_json_to_excel({
          filename: "导出Excel", // 文件名
          bookType: "xlsx", // 导出文件类型
          autoWidth: true, // 是否适应列宽
          multiHeader: [
            // 有多级表头时，可再继续增加数组
            ["一级表头", "", "", "", "", "", "", "", "", ""],
            [
              "二级表头1",
              "二级表头2",
              "",
              "",
              "二级表头3",
              "",
              "",
              "二级表头4",
              "",
              "",
            ],
          ],
          header: [
            "title1",
            "title2",
            "title3",
            "title4",
            "title5",
            "title6",
            "title7",
            "title8",
            "title9",
            "title10",
          ],
          merges: ["A1:J1", "B2:D2", "E2:G2", "H2:J2"], // 所合并的单元格
          data,
        });
        this.btnLoading = false;
      });
    },
    exportExcel1() {
      //调用方法
      var merges = this.getMerges1(this.sheetHead);
      console.log("merges", merges);
        let filterVal = this.getexportData(this.tableData.column);

      var heah = this.getHead(this.sheetHead);
      console.log("heah", heah);

      import("@/vendorcheck/Export2Excel2").then((excel) => {
        let transTable = [];

        excel.export_json_to_excel({
          filename: "萌", // 文件名
          bookType: "xlsx", // 导出文件类型
          autoWidth: true, // 是否适应列宽
          multiHeader: heah,
          header: filterVal,
          merges: merges, // 所合并的单元格
          data:[],
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },

    exports() {
      import("@/vendorcheck/Export2Excel2").then((excel) => {
        let transTable = [];
        let column = JSON.parse(JSON.stringify(this.tableData.column));
        console.log("1");
        let filterVal = this.getexportData(this.tableData.column);
        console.log("2", filterVal);

        this.arrayFlagLevel(column, 0);
        this.digui(column);
        console.log(this.mm);
        this.getMerges(column, 0);
        console.log(this.Cell);
        const data = this.formatJson1(filterVal, transTable); // 处理数据
        console.log("data", data);
        excel.export_json_to_excel({
          filename: "萌", // 文件名
          bookType: "xlsx", // 导出文件类型
          autoWidth: true, // 是否适应列宽
          multiHeader: this.mm,
          header: filterVal,
          merges: this.Cell, // 所合并的单元格
          data,
        });
      });
    },
    //逻辑代码
    getMerges1(json) {
      console.log("没调用?", json);
      let r = this.getDepth(json);
      let d = r.depth;
      let w = r.width;
      var arr = json;
      let tempArr = [];
      var clu = 0;
      var level = 0;
      var obj = {
        root: {
          sc: 0,
          ec: 0,
        },
      };
      console.log("333", tempArr);
      while (arr.length > 0) {
        var cObj = {};
        var temp = [];
        for (var i = 0; i < arr.length; i++) {
          temp.push(arr[i]);
        }
        arr = [];
        for (var i = 0; i < temp.length; i++) {
          if (temp[i].children) {
            cObj[temp[i].label] = temp[i].children;
            for (var j = 0; j < temp[i].children.length; j++) {
              arr.push(temp[i].children[j]);
            }
          }
        }
        if (arr.length > 0) {
          clu = obj[temp[0].pid].sc;
          for (var i = 0; i < temp.length; i++) {
            let len = obj[temp[i].pid].ec;
            if (clu === len) {
              clu = obj[temp[0].pid].sc;
            }
            let sr = 0,
              er = 0,
              sc = 0,
              ec = 0;
            if (temp[i].children) {
              let a = cObj[temp[i].label];
              let { depth, width } = this.getDepth(a);
              sr = level;
              er = d - 1 - depth;
              sc = clu;
              ec = clu + width - 1;
              clu = ec + 1;
              obj[temp[i].id] = {
                sc: sc,
                ec: ec,
              };
            } else {
              sr = level;
              er = d - 1;
              sc = clu;
              ec = clu;
              clu++;
            }
            tempArr.push({
              s: { r: sr, c: sc },
              e: { r: er, c: ec },
            });
          }
        }
        level++;
      }
      console.log("count74===", JSON.stringify(tempArr));
      return tempArr;
    },
    getHead(json) {
      let r = this.getDepth(json);
      var hh = [];
      // 初始化数组
      for (var i = 0; i < r.depth; i++) {
        var tem = [];
        for (var j = 0; j < r.width; j++) {
          tem.push({
            label: "",
          });
        }
        hh.push(tem);
      }
      var arr = json;
      var clu = 0;
      var level = 0;
      //用来查找父节点下标
      var obj = {
        root: {
          sc: 0,
          ec: 0,
        },
      };
      while (arr.length > 0) {
        var cObj = {};
        var temp = [];
        for (var i = 0; i < arr.length; i++) {
          temp.push(arr[i]);
        }
        arr = [];
        for (var i = 0; i < temp.length; i++) {
          if (temp[i].children) {
            cObj[temp[i].label] = temp[i].children;
            for (var j = 0; j < temp[i].children.length; j++) {
              arr.push(temp[i].children[j]);
            }
          }
        }
        clu = obj[temp[0].pid].sc;
        for (var i = 0; i < temp.length; i++) {
          let len = obj[temp[i].pid].ec;
          if (clu === len) {
            clu = obj[temp[0].pid].sc;
          }
          var sc = 0,
            ec = 0;
          if (temp[i].children) {
            hh[level][clu] = { label: temp[i].label };
            let a = cObj[temp[i].label];
            let { width } = this.getDepth(a);
            sc = clu;
            ec = clu + width - 1;
            clu = ec + 1;
            obj[temp[i].id] = {
              sc: sc,
              ec: ec,
            };
          } else {
            hh[level][clu] = { label: temp[i].label };
            clu++;
          }
        }
        level++;
      }
      console.log("header==", hh);
      return hh;
    },
    // 给树结构添加层级 和 添加一个parentId 的顺序数
    arrayFlagLevel(array, level, num = 0) {
      if (!array || !array.length) return;
      array.forEach((item) => {
        item.level = level;
        item.parentId = num;
        ++num;
        if (item.children && item.children.length) {
          this.maxlevel = level + 1;
          this.arrayFlagLevel(item.children, level + 1, num);
        }
      });
    },
    getMerges(data, level) {
      for (let i = 0; i < data.length; i++) {
        this.levelArr[level] = this.levelArr[level]
          ? this.levelArr[level]
          : { len: 0 };
        if (data[i].children) {
          let arr = this.emptyString(data[i].children);
          this.Cell.push(
            this.char[this.levelArr[level].len] +
              (level + 1) +
              ":" +
              this.char[this.levelArr[level].len + arr.length] +
              (level + 1)
          );
          // console.log(data[i].label,level,"-----",arr.length,levelArr[level].len)
          this.levelArr[level].len += arr.length + 1;
          // console.log("+++",levelArr[level].len)
          this.getMerges(data[i].children, data[i].level + 1);
        }
      }
    },
    getDepth(json) {
      var arr = json;
      var depth = 0;
      var width = 0;
      while (arr.length > 0) {
        var temp = [];
        for (var i = 0; i < arr.length; i++) {
          temp.push(arr[i]);
        }
        arr = [];
        for (var i = 0; i < temp.length; i++) {
          if (temp[i].children) {
            for (var j = 0; j < temp[i].children.length; j++) {
              arr.push(temp[i].children[j]);
            }
          } else {
            width++;
          }
        }
        if (arr.length >= 0) {
          depth++;
        }
      }
      return { depth, width };
    },
    digui(data, type = 0) {
      for (let i = 0; i < data.length; i++) {
        this.mm[type]
          ? this.mm[type].push(data[i].label)
          : (this.mm[type] = [data[i].label]);
        if (data[i].children) {
          //   console.log(data[i].label, "------------");
          let arr = this.emptyString(data[i].children);
          //   console.log(arr);
          this.mm[type].push(...arr);
          this.digui(data[i].children, data[i].level + 1);
        } else {
          // isLastLevet()
          if (data[i].level < this.maxlevel) {
            this.mm[this.maxlevel]
              ? this.mm[this.maxlevel].push("")
              : (this.mm[this.maxlevel] = []);
          }
          if (data[i].level == 0) {
            for (let k = 0; k <= this.maxlevel; k++) {
              if (k !== 0) {
                // console.log("------------", k, "-------------------");
                this.mm[k].push(" ");
              }
            }
          }
        }
      }
    },
    emptyString(data, arrString = [], num = 0) {
      for (let i = 0; i < data.length; i++) {
        // console.log('--', data.label)
        if (i > 0) {
          arrString.push("");
        }
        if (data[i].children) {
          ++num;
          this.emptyString(data[i].children, arrString, num);
        }
      }
      // console.log("num",num)
      return arrString;
    },
    getexportData(tableTitleData) {
      let tableDate = JSON.parse(JSON.stringify(tableTitleData));
      for (let i = 0; i < tableDate.length; i++) {
        if (tableDate[i].children) {
          this.getexportData(tableDate[i].children);
        }
        if (tableDate[i].prop) {
          this.exportSumId.push(tableDate[i].prop);
        }
      }
      return this.exportSumId;
    },
    formatJson1(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
  },
};
</script>
