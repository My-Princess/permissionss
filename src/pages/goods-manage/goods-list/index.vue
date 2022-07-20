<template>
  <div class="mychannelProfile" style="villageDetail1">
    <el-menu
      :default-active="activeName"
      class="hk-person-item"
      text-color="#333"
 
      @select="handleSelect"
      :style="{ top: NavDistance + 'px' }"
    >
      <el-menu-item @click="jump(0)" index="1">
        <span>我的地盘资料填报</span>
      </el-menu-item>
      <el-menu-item @click="jump(1)" index="2">
        <span>宣传阵地资料填报</span>
      </el-menu-item>
      <el-menu-item @click="jump(2)" index="3">
        <span>促销阵地资料填报</span>
      </el-menu-item>
      <el-menu-item @click="jump(3)" index="4">
        <span>我的战队资料填报</span>
      </el-menu-item>
      <el-menu-item @click="jump(4)" index="5">
        <span>团队成员资料填报</span>
      </el-menu-item>
      <el-menu-item @click="jump(5)" index="6">
        <span>宣传对比资料填报</span>
      </el-menu-item>
      <el-menu-item @click="jump(6)" index="7">
        <span>我的策略资料填报</span>
      </el-menu-item>
    </el-menu>
    <div class="hk-details-bar" id="state" ref="myMenu">
      <div id="resumes" class="hk-details-title">
         <div class="d_jump" ref="d_jump">
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
          <div>111111111111111111111111111111111111111</div>
 
         </div>
         <div class="d_jump" ref="d_jump">222</div>
         <div class="d_jump" ref="d_jump">333</div>
         <div class="d_jump" ref="d_jump">444</div>
         <div class="d_jump" ref="d_jump">555</div>
         <div class="d_jump" ref="d_jump">666</div>
         <div class="d_jump" ref="d_jump">777</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "1",
      isActive: "1",
      scrolls: {},
      NavDistance: 321,
      navStyle: 0,
      scrollHeight: 0
    };
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.onScroll);
    });
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log("key",key, keyPath);
      var index = "";
      index = key;
      console.log("index",index);
      // if (index === '2') {
      // this.$router.push({path: '/front/project'})
      // this.activeName = '3'
      // }
    },
    onScroll() {
      let scrolled =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrolled >= 1300) {
        this.activeName = "7";
        console.log("7");
      } else if (scrolled < 60 && scrolled >= 0) {
        this.activeName = "1";
        console.log("1");
      } else if (scrolled < 150 && scrolled >= 60) {
        this.activeName = "2";
        console.log("2");
      } else if (scrolled < 200 && scrolled >= 100) {
        this.activeName = "3";
        console.log("3");
      } else if (scrolled < 600 && scrolled >= 500) {
        this.activeName = "4";
        console.log("4");
      } else if (scrolled < 700 && scrolled >= 600) {
        this.activeName = "5";
        console.log("5");
      } else if (scrolled < 800 && scrolled >= 700) {
        this.activeName = "6";
        console.log("6");
      }
    },
    onScrollBehavior(index) {},
    // 锚点实验
    jump(index) {
      console.log(index);
      let active = index.toString();
      this.isActive = active;
      // 判断导航高度
      // myMenu
      let height = this.$refs.myMenu.offsetHeight;
      // 用 class="d_jump" 添加锚点
      let jump = window.document.querySelectorAll(".d_jump");
      let total = jump[index].offsetTop;
      console.log("total",total);
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50;
      // 判断小导航距离顶部的位置
      let newDistance = this.NavDistance;
      if (index === 0 && newDistance < total) {
        newDistance = 321;
      } else if (index > 0 || index <= 6) {
        this.NavDistance = total;
      } else {
        this.NavDistance = total - 600;
      }

      if (total > distance) {
        smoothDown();
      } else {
        let newTotal = distance - total;
        step = newTotal / 50;
        smoothUp();
      }
      function smoothDown() {
        if (distance < total) {
          distance += step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothDown, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }
      function smoothUp() {
        if (distance > total) {
          distance -= step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothUp, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }
    }
  },
  watch: {
    activeName: function() {
      console.log(this.activeName);
    }
  }
};
</script>

<style>
.mychannelProfile{
  height: 100%;
  overflow-y: scroll;
}
.villageDetail1{
  position: relative;
}
.hk-person-item{
position:fixed;
top: 20% !important;
}
</style>
