<template>
  <div>
    wwwwwwwwwwwwwwwwwww kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    wwwwwwwwwwwwwwwwwww kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    <el-button
      type="primary"
      icon="el-icon-upload"
      @click="uploadFileVisible = true"
      >上传</el-button
    >

    <el-dialog title="上传资料" :visible.sync="uploadFileVisible" width="600px">
      <file-upload
        style="height: 300px"
        @doneBlock="uploadSuccess"
      ></file-upload>
    </el-dialog>

    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleChange"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>

    <el-button @click="isUploadExcelShow = true">input原生封装的上传</el-button>

    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :visible.sync="isUploadExcelShow"
      @readerDate="readerDate"
      :isUpdata="false"
    />

    <iframe src="http://172.16.153.68:8080/fff.html" frameborder="0"></iframe>
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";

import FileUpload from "@/components/FileUpload/index.vue";
export default {
  components: { FileUpload, UploadExcelComponent },
  data() {
    return {
        fileData:"",
      uploadFileVisible: false,
isUploadExcelShow:false,
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  methods: {
     handleSuccess(e) {
console.log("成功",e)
     },
        beforeUpload(file) {
                  const isLt1M = file.size / 1024 / 1024 < 100;
      if (isLt1M) {
        this.fileData = file;
        return true;
      } else {
        this.$message({
          message: "上传文件太大,不能超过100M",
          type: "warning",
        });
        return false;
      }
        },
         readerDate(val) {},
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    uploadFile() {
      this.uploadFileVisible = true;
    },
    uploadSuccess(obj) {
      console.log("success");
      //这里是上传成功后回调的函数，可以根据自己的业务需求来进行操作
      //我这边上传成功后往数据库插入一条数据
      var proFile = {};
      proFile.fileName = obj.result.fileName;
      proFile.recordDate = "";
      proFile.recorder = localStorage.getItem("ms_username");
      proFile.fileUrl = obj.result.fileUrl;
      proFile.fileSize = obj.result.fileSize;
      console.log("proFile", proFile);
      //保存的业务接口
      this.$axios.post("/erp/test/save", proFile).then((res) => {
        if (res.data.code == "error") {
          this.$message({
            message: res.data.msg,
            type: "error",
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.getData();
        }
      });
    },
  },
};
</script>
