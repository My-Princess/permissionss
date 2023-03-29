<template>
  <div class="box">
    <!-- 内容区域 -->
    <div class="content">
      <div class="xixi" id="myterritory">
        content-00
      </div>
      <div class="xixi" id="publicity">
        content-1
      </div>
      <div class="xixi" id="promotion">
        content-2
      </div>
      <div class="xixi" id="teamMember">
        content-3
      </div>
      <div class="xixi" id="publicityComparison">
        content-4
      </div>
      <div class="xixi" id="myStrategy">
        content-5
      </div>
    </div>
    <!-- 导航区域 -->
    <ul class="navs">
      <li :class="{ active: active === 0 }" @click="goAnchor('myterritory')">
        content-0
      </li>
      <li :class="{ active: active === 1 }" @click="goAnchor('publicity')">
        content-1
      </li>
      <li :class="{ active: active === 2 }" @click="goAnchor('promotion')">
        content-2
      </li>
      <li :class="{ active: active === 3 }" @click="goAnchor('teamMember')">
        content-3
      </li>
      <li
        :class="{ active: active === 4 }"
        @click="goAnchor('publicityComparison')"
      >
        content-4
      </li>
      <li :class="{ active: active === 4 }" @click="goAnchor('myStrategy')">
        content-5
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      active: 0, // 当前激活的导航索引
      arr: [
        { index: 0, name: "我的地盘资料填报", falg: false },
        { index: 1, name: "宣传阵地资料填报", falg: false },
        { index: 2, name: "促销阵地资料填报", falg: false },
        { index: 3, name: "团队成员资料填报", falg: false },
        { index: 4, name: "宣传对比资料填报", falg: false },
        { index: 5, name: "我的策略资料填报", falg: false },
      ],
    };
  },
  mounted() {
    // 监听滚动事件
    window.addEventListener("scroll", this.onScroll);
    this.arr[0].falg = true;
  },
  destroy() {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    // 滚动监听器
    onScroll() {
      // 获取所有锚点元素
      const navContents = document.querySelectorAll(".content .xixi");
      // 所有锚点元素的 offsetTop
      const offsetTopArr = [];
      navContents.forEach((item) => {
        offsetTopArr.push(item.offsetTop - 91);
      });
      // console.log("offsetTopArr", offsetTopArr);
      // 获取当前文档流的 scrollTop
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 定义当前点亮的导航下标
      let navIndex = 0;
      // console.log("scrollTop", scrollTop);
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是 n 了
        if (scrollTop >= offsetTopArr[n]) {
          navIndex = n;
        }
      }
      console.log("navIndex", navIndex);
      // 把下标赋值给 vue 的 datait
      this.active = navIndex;
      if (!this.arr[this.active].falg) {
        this.arr.some((item) => {
          if (item.index == this.active) {
            item.falg = true;
            console.log("发送请求"+ this.active )
          }
        });
      }
    },
    goAnchor(id) {
      let anchor = document.getElementById(id);
      // anchor.scrollIntoView();
      // chrome
      document.body.scrollTop = Math.floor(anchor.offsetTop - 90);
      // console.log("scrollTop111", document.body.scrollTop);

      // firefox
      // document.documentElement.scrollTop = anchor.offsetTop;
      // safari
      // window.pageYOffset = anchor.offsetTop;
    },
  },
};
</script>

<style scoped>
.box{
    height:100%;
	overflow:scroll;
}
/* 内容区的样式 */
.content {
  background-color: white;
  width: 500px;
  /* height:100%; */
	/* overflow:scroll; */
}
.content div {
  width: 100%;
  height: 600px;
  font-size: 36px;
  padding: 20px;
  background-color: #7ec384;
}
.content div:nth-child(2n) {
  background-color: #847ec3;
}
/* 导航栏的样式 */
.navs {
  position: fixed;
  top: 80px;
  left: 700px;
  background-color: #efefef;
}
.navs li {
  padding: 0 20px;
  line-height: 1.6;
  font-size: 24px;
}
/* 当导航被点亮后改变颜色 */
.navs .active {
  color: #847ec3;
  background-color: #e2e2e2;
}
</style>
