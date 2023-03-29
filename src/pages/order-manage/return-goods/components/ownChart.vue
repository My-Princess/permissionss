<template>
  <div>
    <el-button @click="openLoginDialog">打开全局弹窗</el-button>
  </div>
</template>

<script>
import lbTable from "@/components/Table/lb-table/lb-table";

export default {
  methods: {
    // 打开登录注册弹窗
    openLoginDialog() {
      // this.$login();
      // this.$theConfirm("嘻嘻")
      //   .then((res) => {
      //     console.log("res", res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      this.$dlsConfirm({
        title: "提示",
        message: "是否确认删除病情管理记录？",
      })
        .then((res) => {
          // this.doDelete();
          console.log("seccess")
          console.log("res",res)
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style></style>
