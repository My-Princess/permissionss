<template>
  <div>
    <el-dialog
      title="上传文件"
      :visible.sync="isShow"
      width="1000px"
      custom-class="importDialog"
    >
      <input
        ref="excel-upload-input"
        class="excel-upload-input"
        type="file"
        accept=".xlsx, .xls"
        @change="handleClick"
      />
      <div
        class="drop"
        @drop="handleDrop"
        @dragover="handleDragover"
        @dragenter="handleDragover"
      >
        拖拽文件到此
        <el-button
          :loading="loading"
          style="margin-left:16px;"
          size="mini"
          type="primary"
          @click="handleUpload"
        >
          文件选择
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="isUpdataShow"
      width="30%"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <span>区域机构是否同步到营销团队</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="celUpdata">取 消</el-button>
        <el-button type="primary" @click="submitUpdata">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  props: {
    refreshTable: Function,
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function, // eslint-disable-line
    visible: {
      type: Boolean,
      default: false
    },
    isUpdata: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loading: false,
      isUpdataShow: false,
      NoUpdata: false,
      excelData: {
        header: null,
        results: null,
        file: null,
        synchMkt:null,
      }
    };
  },
  computed: {
    isShow: {
      get() {
        return this.visible;
      },
      set(s) {
        this.$emit("update:visible", s);
      }
    }
    // isUpdataShow: {
    //   get() {
    //     return this.isUpdata;
    //   },
    //   set(s) {
    //     this.$emit("update:isUpdata", s);
    //   }
    // }
  },
  watch: {
    // isShow(val) {
    //   if (!this.loading) {
    //     this.$emit("readerDate", false);
    //   }
    // }
  },
  methods: {
    celUpdata() {
      this.isUpdataShow = false;
      this.excelData.synchMkt = 0;
      // this.excelData.loading = this.loading;
      this.onSuccess && this.onSuccess(this.excelData);
    },
    submitUpdata() {
      this.isUpdataShow = false;
      this.excelData.synchMkt = 1;
      // this.excelData.loading = this.loading;
      this.onSuccess && this.onSuccess(this.excelData);
    },
    generateData({ header, results }) {
      if (this.isUpdata) {
        this.isUpdataShow = true;
      } else {
        this.excelData.header = header;
        this.excelData.results = results;
        this.excelData.loading = this.loading;
        this.onSuccess && this.onSuccess(this.excelData);
      }
    },
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.loading) return;
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        this.$message.error("Only support uploading one file!");
        return;
      }
      const rawFile = files[0]; // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.$message.error(
          "Only supports upload .xlsx, .xls, .csv suffix files"
        );
        return false;
      }
      this.excelData.file = rawFile;
      this.upload(rawFile);
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      this.$emit("readerDate", true);
      e.dataTransfer.dropEffect = "copy";
    },
    handleUpload() {
      this.$refs["excel-upload-input"].click();
      this.$emit("readerDate", true);
    },
    handleClick(e) {
      const files = e.target.files;
      const rawFile = files[0]; // only use files[0]
      if (!rawFile) return;

      this.excelData.file = rawFile;
      this.upload(rawFile);
    },
    upload(rawFile) {
      this.$refs["excel-upload-input"].value = null; // fix can't select the same excel
      if (!this.beforeUpload) {
        this.readerData(rawFile);
        return;
      }

      const before = this.beforeUpload(rawFile);
      if (before) {
        this.readerData(rawFile);
      }
    },
    readerData(rawFile) {
      this.loading = true;
      this.isShow = true;

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array", cellDates: true });
          console.log("workbook.SheetNames", workbook.SheetNames);
          const firstSheetName = workbook.SheetNames[0];
          console.log("firstSheetName", firstSheetName);
          if (firstSheetName == "Cognos_Office_Connection_Cache") {
            this.$message({
              message: "文件损坏,请复制到新文件试试",
              type: "error"
            });
            this.loading = false;
            this.isShow = false;
            return;
          } else {
            const worksheet = workbook.Sheets[firstSheetName];
            const header = this.getHeaderRow(worksheet);
            const results = XLSX.utils.sheet_to_json(worksheet);
            this.generateData({ header, results });
            this.loading = false;
            this.isShow = false;
          }

          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },
    getHeaderRow(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet["!ref"]);
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    },
    // Loading加载
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      return loading;
    }
  }
};
</script>

<style scoped>
.excel-upload-input {
  display: none;
  z-index: -9999;
}
.drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
