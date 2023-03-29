<template>
<div>

  <input v-model="internalName" />
  子{{aa}}
  <button @click="aaa">按钮</button>
</div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    aa:{
        type:Object
    }
  },
  data() {
    return {
      internalName: this.value,
    }
  },
  created(){
    this.aa.a.b = 3
  },
  watch: {
    internalName(newVal) {
    console.log(newVal)
      this.$emit('input', newVal) // 在修改 internalName 值时，向父组件发出 input 事件
    },
  },
  methods:{
    aaa(){
      this.aa=  JSON.parse(JSON.stringify(this.aa))
    }
  }
}
</script>