<template>
  <div class="ProcessingInfo" ref="css_page">
    <el-button @click="btn">导出</el-button>
    <hr />
    <el-button @click="exportData">导出</el-button>
    <!-- <el-table
      @selection-change="handleSelectionChange"
      :data="list"
      style="width: 100%"
      size="mini"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        label="姓名"
        prop="name"
        align="center"
      ></el-table-column>
      <el-table-column label="专业技能" align="center">
        <el-table-column label="前端" align="center">
          <el-table-column
            label="JavaScript"
            prop="js"
            align="center"
          ></el-table-column>
          <el-table-column
            label="CSS"
            prop="css"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="后端" align="center">
          <el-table-column label="java" align="center">
            <el-table-column
              label="nio"
              prop="nio"
              align="center"
            ></el-table-column>
            <el-table-column
              label="基础"
              prop="basic"
              align="center"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="框架" align="center">
            <el-table-column
              label="SpringBoot"
              prop="springboot"
              align="center"
            ></el-table-column>
            <el-table-column
              label="MyBatis"
              prop="mybatis"
              align="center"
            ></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table> -->
 
        <lb-table

      :column="revealList"
      :data="list"
     @selection-change="handleSelectionChange"
      :height="'400px'"
    
      background
     
    />
  </div>
</template>

<script>
import XLSX from "xlsx-style";
import lbTable from "@/components/Table/lb-table/lb-table";

export default {
  data() {
    return {
      loading: false,

      selectionData: [],
      list: [
        {
          companyName: "张三",
          js: "熟练",
          css: "一般",
          nio: "了解",
          basic: "精通",
          springboot: "熟练",
          mybatis: "了解",
        },
        {
          companyName: "张三",
          js: "熟练",
          css: "一般",
          nio: "了解",
          basic: "精通",
          springboot: "熟练",
          mybatis: "了解",
        },
        {
          companyName: "张三",
          js: "熟练",
          css: "一般",
          nio: "了解",
          basic: "精通",
          springboot: "熟练",
          mybatis: "了解",
        },
        {
          companyName: "张三",
          js: "熟练",
          css: "一般",
          nio: "了解",
          basic: "精通",
          springboot: "熟练",
          mybatis: "了解",
        },
      ],
      revealList1: [
        {
          name: "姓名",
          prop: "name",
        },
        {
          name: "专业技能",
          children: [
            {
              name: "前端",
              children: [
                {
                  name: "JavaScript",
                  prop: "js",
                },
                {
                  name: "CSS",
                  prop: "css",
                },
              ],
            },
            {
              name: "后端",
              children: [
                {
                  name: "java",
                  children: [
                    {
                      name: "nio",
                      prop: "nio",
                    },
                    {
                      name: "基础",
                      prop: "basic",
                    },
                  ],
                },
                {
                  name: "框架",
                  children: [
                    {
                      name: "SpringBoot",
                      prop: "springboot",
                    },
                    {
                      name: "MyBatis",
                      prop: "mybatis",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      revealList: [
          { type: "selection", align: "center" },

        //基本信息
        {
          label: "基本信息",
          align: "center",
          children: [
            {
              prop: "companyName",
              align: "center",
              label: "今天好惨",
              minWidth: 110,
            },
            {
              prop: "companyName1",
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
    };
  },
    components: {
    lbTable,
  },
  methods: {
    handleSelectionChange(selection) {
      this.selectionData = selection;
    },
    exportData() {
      if (!Array.isArray(this.selectionData) || this.selectionData.length < 1) {
        this.$message({ type: "error", message: "请选择需要导出的数据！" });
        return;
      }
      let sheetName = "xlsx复杂表格导出demo";
      // excel表头
      let excelHeader = this.buildHeader(this.revealList);
      // 头部行数，用来固定表头
      let headerRows = excelHeader.length;
      // 提取数据
      let dataList = this.extractData(this.selectionData, this.revealList);
      excelHeader.push(...dataList, []);
      // 计算合并
      let merges = this.doMerges(excelHeader);
      // 生成sheet
      let ws = this.aoa_to_sheet(excelHeader, headerRows);
      // 单元格合并
      ws["!merges"] = merges;
      // 头部冻结
      ws["!freeze"] = {
        xSplit: "1",
        ySplit: "" + headerRows,
        topLeftCell: "B" + (headerRows + 1),
        activePane: "bottomRight",
        state: "frozen",
      };
      // 列宽
      ws["!cols"] = [{ wpx: 165 }];
      let workbook = {
        SheetNames: [sheetName],
        Sheets: {},
      };
      workbook.Sheets[sheetName] = ws;
      // excel样式
      let wopts = {
        bookType: "xlsx",
        bookSST: false,
        type: "binary",
        cellStyles: true,
      };
      let wbout = XLSX.write(workbook, wopts);
      let blob = new Blob([this.s2ab(wbout)], {
        type: "application/octet-stream",
      });
      this.openDownloadXLSXDialog(blob, sheetName + ".xlsx");
    },

    /**
     * 构建excel表头
     * @param revealList 列表页面展示的表头
     * @returns {[]} excel表格展示的表头
     */
    buildHeader(revealList) {
      let excelHeader = [];
      // 构建生成excel表头需要的数据结构
      this.getHeader(revealList, excelHeader, 0, 0);
      // 多行表头长短不一，短的向长的看齐，不够的补上行合并占位符
      let max = Math.max(...excelHeader.map((a) => a.length));
      excelHeader
        .filter((e) => e.length < max)
        .forEach((e) => this.pushRowSpanPlaceHolder(e, max - e.length));
      return excelHeader;
    },

    /**
     * 生成头部
     * @param headers 展示的头部
     * @param excelHeader excel头部
     * @param deep 深度
     * @param perOffset 前置偏移量
     * @returns {number}  后置偏移量
     */
    getHeader(headers, excelHeader, deep, perOffset) {
      let offset = 0;
      let cur = excelHeader[deep];
      if (!cur) {
        cur = excelHeader[deep] = [];
      }
      // 填充行合并占位符
      this.pushRowSpanPlaceHolder(cur, perOffset - cur.length);
      for (let i = 0; i < headers.length; i++) {
        let head = headers[i];
        cur.push(head.label);
        if (
          head.hasOwnProperty("children") &&
          Array.isArray(head.children) &&
          head.children.length > 0
        ) {
          let childOffset = this.getHeader(
            head.children,
            excelHeader,
            deep + 1,
            cur.length - 1
          );
          // 填充列合并占位符
          this.pushColSpanPlaceHolder(cur, childOffset - 1);
          offset += childOffset;
        } else {
          offset++;
        }
      }
      return offset;
    },
    /**
     * 根据选中的数据和展示的列，生成结果
     * @param selectionData
     * @param revealList
     */
    extractData(selectionData, revealList) {
      // 列
      let headerList = this.flat(revealList);
      // 导出的结果集
      let excelRows = [];
      // 如果有child集合的话会用到
      let dataKeys = new Set(Object.keys(selectionData[0]));
      selectionData.some((e) => {
        if (e.children && e.children.length > 0) {
          let childKeys = Object.keys(e.children[0]);
          for (let i = 0; i < childKeys.length; i++) {
            dataKeys.delete(childKeys[i]);
          }
          return true;
        }
      });
      this.flatData(selectionData, (list) => {
        excelRows.push(...this.buildExcelRow(dataKeys, headerList, list));
      });
      return excelRows;
    },
    buildExcelRow(mainKeys, headers, rawDataList) {
      // 合计行
      let sumCols = [];
      // 数据行
      let rows = [];
      for (let i = 0; i < rawDataList.length; i++) {
        let cols = [];
        let rawData = rawDataList[i];
        // 提取数据
        for (let j = 0; j < headers.length; j++) {
          let header = headers[j];
          // 父元素键需要行合并
          if (rawData["rowSpan"] === 0 && mainKeys.has(header.prop)) {
            cols.push("!$ROW_SPAN_PLACEHOLDER");
          } else {
            let value;
            if (typeof header.exeFun === "function") {
              value = header.exeFun(rawData);
            } else {
              value = rawData[header.prop];
            }
            cols.push(value);
            // 如果该列需要合计,并且是数字类型
            if (header["summable"] && typeof value === "number") {
              sumCols[j] = (sumCols[j] ? sumCols[j] : 0) + value;
            }
          }
        }
        rows.push(cols);
      }
      // 如果有合计行
      if (sumCols.length > 0) {
        rows.push(...this.sumRowHandle(sumCols));
      }
      return rows;
    },
    sumRowHandle(sumCols) {
      //TODO
      return [];
    },
    /**
     * 合并头部单元格
     **/
    doMerges(arr) {
      // 要么横向合并 要么纵向合并
      let deep = arr.length;
      let merges = [];
      for (let y = 0; y < deep; y++) {
        // 先处理横向合并
        let row = arr[y];
        let colSpan = 0;
        for (let x = 0; x < row.length; x++) {
          if (row[x] === "!$COL_SPAN_PLACEHOLDER") {
            row[x] = undefined;
            if (x + 1 === row.length) {
              merges.push({
                s: { r: y, c: x - colSpan - 1 },
                e: { r: y, c: x },
              });
            }
            colSpan++;
          } else if (colSpan > 0 && x > colSpan) {
            merges.push({
              s: { r: y, c: x - colSpan - 1 },
              e: { r: y, c: x - 1 },
            });
            colSpan = 0;
          } else {
            colSpan = 0;
          }
        }
      }
      // 再处理纵向合并
      let colLength = arr[0].length;
      for (let x = 0; x < colLength; x++) {
        let rowSpan = 0;
        for (let y = 0; y < deep; y++) {
          if (arr[y][x] === "!$ROW_SPAN_PLACEHOLDER") {
            arr[y][x] = undefined;
            if (y + 1 === deep) {
              merges.push({ s: { r: y - rowSpan, c: x }, e: { r: y, c: x } });
            }
            rowSpan++;
          } else if (rowSpan > 0 && y > rowSpan) {
            merges.push({
              s: { r: y - rowSpan - 1, c: x },
              e: { r: y - 1, c: x },
            });
            rowSpan = 0;
          } else {
            rowSpan = 0;
          }
        }
      }
      return merges;
    },
    aoa_to_sheet(data, headerRows) {
      const ws = {};
      const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
      for (let R = 0; R !== data.length; ++R) {
        for (let C = 0; C !== data[R].length; ++C) {
          if (range.s.r > R) {
            range.s.r = R;
          }
          if (range.s.c > C) {
            range.s.c = C;
          }
          if (range.e.r < R) {
            range.e.r = R;
          }
          if (range.e.c < C) {
            range.e.c = C;
          }
          /// 这里生成cell的时候，使用上面定义的默认样式
          const cell = {
            v: data[R][C] || "",
            s: {
              font: { label: "宋体", sz: 11, color: { auto: 1 } },
              alignment: {
                /// 自动换行
                wrapText: 1,
                // 居中
                horizontal: "center",
                vertical: "center",
                indent: 0,
              },
            },
          };
          // 头部列表加边框
          if (R < headerRows) {
            cell.s.border = {
              top: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            };
            cell.s.fill = {
              patternType: "solid",
              fgColor: { theme: 3, tint: 0.3999755851924192, rgb: "DDD9C4" },
              bgColor: { theme: 7, tint: 0.3999755851924192, rgb: "8064A2" },
            };
          }
          const cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
          if (typeof cell.v === "number") {
            cell.t = "n";
          } else if (typeof cell.v === "boolean") {
            cell.t = "b";
          } else {
            cell.t = "s";
          }
          ws[cell_ref] = cell;
        }
      }
      if (range.s.c < 10000000) {
        ws["!ref"] = XLSX.utils.encode_range(range);
      }
      return ws;
    },
    /**
     * 填充行合并占位符
     * */
    pushRowSpanPlaceHolder(arr, count) {
      for (let i = 0; i < count; i++) {
        arr.push("!$ROW_SPAN_PLACEHOLDER");
      }
    },
    // 填充列合并占位符
    pushColSpanPlaceHolder(arr, count) {
      for (let i = 0; i < count; i++) {
        arr.push("!$COL_SPAN_PLACEHOLDER");
      }
    },
    /**
     * 展开数据，为了实现父子关系的数据进行行合并
     *   [{
     *     a:1,
     *     b:2,
     *     children: [
     *       {
     *         c:3
     *       },
     *       {
     *         c:4
     *       }
     *     ]
     *   }]
     *
     *   展开为
     *   [
     *    {
     *      a:1,
     *      b:2,
     *      c:3,
     *      rowSpan:2,
     *      children:[...]
     * @param list
     * @param eachDataCallBack
     */
    flatData(list, eachDataCallBack) {
      let resultList = [];
      for (let i = 0; i < list.length; i++) {
        let data = list[i];
        let rawDataList = [];
        // 每个子元素都和父元素合并成一条数据
        if (data.children && data.children.length > 0) {
          for (let j = 0; j < data.children.length; j++) {
            delete data.children[j].bsm;
            let copy = Object.assign({}, data, data.children[j]);
            rawDataList.push(copy);
            copy["rowSpan"] = j > 0 ? 0 : data.children.length;
          }
        } else {
          data["rowSpan"] = 1;
          rawDataList.push(data);
        }
        resultList.push(...rawDataList);
        if (typeof eachDataCallBack === "function") {
          eachDataCallBack(rawDataList);
        }
      }
      return resultList;
    },
    // 扁平头部
    flat(revealList) {
      let result = [];
      revealList.forEach((e) => {
        if (e.hasOwnProperty("children")) {
          result.push(...this.flat(e.children));
        } else if (e.hasOwnProperty("exeFun")) {
          result.push(e);
        } else if (e.hasOwnProperty("prop")) {
          result.push(e);
        }
      });
      return result;
    },
    s2ab(s) {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xff;
      }
      return buf;
    },
    openDownloadXLSXDialog(url, saveName) {
      if (typeof url == "object" && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
      }
      var aLink = document.createElement("a");
      aLink.href = url;
      aLink.download = saveName || ""; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
      var event;
      if (window.MouseEvent) {
        event = new MouseEvent("click");
      } else {
        event = document.createEvent("MouseEvents");
        event.initMouseEvent(
          "click",
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
      }
      aLink.dispatchEvent(event);
    },

    btn() {
      import("@/vendorcheck/Export2Excel").then((excel) => {
        // 一级表头
        const multiHeader = [
          [
            "组织",
            "产品编码",
            "产品型号",
            "物料编码",
            "物料名称",
            "规格描述",
            "是否签样",
            "订单需求数量",
            "用量",
            "损耗数量",
            "需求数量汇总",
            "试产/样品仓库存量",
            "试产/样品仓库存量",
            "缺口量",
            "量产仓库",
            "到货在检",
            "采购在途",
            "跨组织库存量1",
            "跨组织库存量1",
            "跨组织库存量1",
            "跨组织库存量2",
            "跨组织库存量2",
            "跨组织库存量2",
          ],
        ];
        // 二级表头
        const tHeader = [
          "组织",
          "产品编码",
          "产品型号",
          "物料编码",
          "物料名称",
          "规格描述",
          "是否签样",
          "订单需求数量",
          "用量",
          "损耗数量",
          "需求数量汇总",
          "博罗",
          "兰溪",
          "缺口量",
          "量产仓库",
          "到货在检",
          "采购在途",
          "组织",
          "试产/样品仓",
          "量产仓库",
          "组织",
          "试产/样品仓",
          "量产仓库",
        ];
        // 对应数据属性
        const filterVal = [
          "orgId",
          "produceCode",
          "produceModal",
          "matterCode",
          "matterName",
          "modal",
          "ifSigned",
          "orderAmount",
          "dosage",
          "damageAmount",
          "demandTotalAmount",
          "trialInvBl",
          "trialInvLx",
          "gapAmount",
          "mpInv",
          "checkInv",
          "onPassageAmount",
          "orgId1",
          "trialInv1",
          "mpInv1",
          "orgId2",
          "trialInv2",
          "mpInv2",
        ]; // 数据属性

        var list = [];
        const merges = [
          "A1:A2",
          "B1:B2",
          "C1:C2",
          "D1:D2",
          "E1:E2",
          "F1:F2",
          "G1:G2",
          "H1:H2",
          "I1:I2",
          "J1:J2",
          "K1:K2",
          "L1:M1",
          "N1:N2",
          "O1:O2",
          "P1:P2",
          "Q1:Q2",
          "R1:S1:T1",
          "U1:V1:W1",
        ]; //需要合并的单元格
        const data = list.map((item) => filterVal.map((j) => item[j])); // 转换二维数组
        const filename = "项目物料排查";
        excel.export_json_to_excel({
          multiHeader: multiHeader, // 一级表头
          header: tHeader, // 二级表头
          data: data, // 数据
          filename: filename, // 导出excel的名称
          merges: merges, // 合并表格的数据
          autoWidth: true,
          bookType: "xlsx",
        });
        //   loading.close()
      });
    },
  },
};
</script>
