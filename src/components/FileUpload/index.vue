<template>
  <uploader
    :options="options"
    :autoStart="false"
    @file-success="onFileSuccess"
    @file-added="filesAdded"
  >
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <uploader-btn>选择文件</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>

<script>
import SparkMD5 from "spark-md5";
export default {
  name: "FileUpload",
  data() {
    return {
      options: {
        target: "/erp/file_upload/chunk", //SpringBoot后台接收文件夹数据的接口
        testChunks: true, //是否分片-分片
        chunkSize: 1024 * 1024,//分块大小, //分块大小
        fileParameterName: "file",
        maxChunkRetries: 3, //最大自动失败重试上传次数
        // checkChunkUploadedByResponse: function(chunk, message) {
        //     console.log("1111",message)
        //   let objMessage = JSON.parse(message);
        //   // 获取当前的上传块的集合
        //   let chunkNumbers = objMessage.result.chunkNumbers;
        //   // 判断当前的块是否被该集合包含，从而判定是否需要跳过
        //   return (chunkNumbers || []).indexOf(chunk.offset + 1) >= 0;
        // },
      },
    };
  },
  methods: {
    onFileSuccess: function(rootFile, file, response, chunk) {
        console.log("response",response)
      let res = JSON.parse(response);
      if (res.code == "error") {
        _this.$message({
          message: res.message,
          type: "error",
        });
      }
      //文件以存在，直接调用回调函数
      if (res.result.code == 200) {
        //执行回调函数
        this.$emit("doneBlock", res);
      }
      // 需要合并
      if (res.result.code == 205) {
        const formData = new FormData();
        formData.append("identifier", file.uniqueIdentifier);
        formData.append("filename", file.name);
        formData.append("totalSize", file.size);
        this.$axios.post("/erp/file_upload/merge", formData).then((res) => {
          //执行回调函数
          this.$emit("doneBlock", res.data);
        });
      }
    },
    filesAdded(file, event) {
      this.computeMD5(file);
    },
    computeMD5(file) {
      const loading = this.$loading({
        lock: true,
        text: "正在计算MD5",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let fileReader = new FileReader();
      let time = new Date().getTime();
      let blobSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice;
      let currentChunk = 0;
      const chunkSize = 30 * 1024 * 1024;
      let chunks = Math.ceil(file.size / chunkSize);
      let spark = new SparkMD5.ArrayBuffer();
      file.pause();
      loadNext();
      fileReader.onload = (e) => {
        spark.append(e.target.result);
        if (currentChunk < chunks) {
          currentChunk++;
          loadNext();
          // 实时展示MD5的计算进度
          this.$nextTick(() => {
            console.log(
              "校验MD5 " + ((currentChunk / chunks) * 100).toFixed(0) + "%"
            );
          });
        } else {
          let md5 = spark.end();
          loading.close();
          this.computeMD5Success(md5, file);
          console.log(
            `MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${
              file.size
            } 用时：${new Date().getTime() - time} ms`
          );
        }
      };
      fileReader.onerror = function() {
        this.error(`文件${file.name}读取出错，请检查该文件`);
        loading.close();
        file.cancel();
      };
      function loadNext() {
        let start = currentChunk * chunkSize;
        let end =
          start + chunkSize >= file.size ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
      }
    },
    computeMD5Success(md5, file) {
    //   console.log("开始上传1")

      file.uniqueIdentifier = md5; //把md5值作为文件的识别码
      console.log("开始上传")
      file.resume(); //开始上传
    },
  },
};
</script>

<style></style>
