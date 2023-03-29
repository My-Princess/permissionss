<template>
  <div>
    <h3>Object.defineProperty 的缺陷</h3>
    <h5>无法检测到对象属性的新增或删除</h5>
    <p>{{ obj }}</p>
    <hr />
    <h5>无法监听数组变化</h5>
    <p>{{ arr }}</p>
    <hr />
    <p v-for="(value, key) in items" :key="key">{{ key }}:{{ value }}</p>
    <button @click="addProperty">动态添加新属性</button>

    <hr />
    <h2>vue继承</h2>
    <child></child>
    <!-- <base></base> -->

    <hr />
    <h2>JSON转换</h2>
  </div>
</template>

<script>
import base from "./components/base.vue";
import child from "./components/child.vue";
export default {
  components: { child, base },
  data() {
    return {
      obj: {
        a: 2,
      },
      arr: [1, 2],
      items: {
        oldProperty: "旧属性",
      },
    };
  },
  mounted() {
    /* 无法检测到对象属性的新增或删除 */
    // this.obj.b = 222;
    // 解决方法
    // 方法一：
    this.obj = Object.assign({}, this.obj, { b: 1, e: 2, a: 3333 });
    // 方法二：vue 提供的$set()
    // this.$set(this.obj,"a",0)
    // this.$set(this.obj,"b",222)
    // 方法三：
    // this.obj = {...this.obj,...{ a:222, b: 3, e: 2 }}

    /* 无法监听数组的变化 */

    var json = `[{&quot;a&quot;:&quot;户外大牌&quot;,&quot;b&quot;:&quot;1&quot;,&quot;c&quot;:&quot;&quot;,&quot;d&quot;:&quot;&quot;,&quot;e&quot;:&quot;&quot;,&quot;UTHG&quot;:&quot;&quot;},{&quot;a&quot;:&quot;门口宣传&quot;,&quot;b&quot;:&quot;1&quot;}]`;

    var d = document.createElement("div");
    d.innerHTML = json;
    json = d.innerText || d.textContent;
    json = JSON.parse(json);
    console.log("转换的JSON", json);
  },
  methods: {
    addProperty() {
      this.items.newProperty = "新属性"; // 为items添加新属性
      console.log(this.items); // 输出带有newProperty的items
    },
  },
};
</script>

<style></style>
