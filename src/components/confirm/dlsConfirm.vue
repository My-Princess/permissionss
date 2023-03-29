<template>
  <div v-if="showConfirm">
    <div class="dlsDialog">
      <div class="dialog-title dls-b">
        {{ content.title }}
      </div>
      <div class="dialog-content">
        <div>
          {{content.message}}
        </div>
      </div>
      <div class="dialog-footer">
        <div class="but cancelBut" @click="close()">取消</div>
        <div class="but confirmBut" @click="confirm">确定</div>
      </div>
    </div>
    <div class="dialog-wrapper" @click.stop="showConfirm = false"></div>
  </div>
</template>

<script>
export default {
  name: 'DlsConfirm',
  data () {
    return {
      showConfirm: false,
      content: {
        title: '提示',
        message: ''
      }
    }
  },
  methods: {
    confirm () {
      console.log('确定')
    },
    close () {
      console.log('关闭')
    }
  }
}
</script>

<style lang="scss" scoped>
.dlsDialog {
  min-height: 200px;
  width: 45vw;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 0px #E8E3E3;
  border-radius: 10px;
  z-index: 6001;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .dialog-title{
    height: 68px;
    line-height: 68px;
    text-align: center;
    position: relative;
    font-size: 20px;
    font-weight: 600;
    &.dls-b{
      border-bottom: 1px solid #D8D8D8;
    }
  }
  .dialog-content{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
    padding: 20px;
    div {
      text-align: center;
      line-height: 30px;
      white-space: pre-line;
    }
  }
  .dialog-footer{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .but {
      width: 160px;
      height: 54px;
      line-height: 54px;
      border-radius: 27px;
      color: #ffffff;
    }
    .but:not(:last-child) {
      margin-right: 20px;
    }
    .cancelBut {
      background-color: #9F78A1;
      border: #9F78A1;
    }
    .confirmBut {
      background-color: #775979;
      border: #775979;
    }
  }
}
.dialog-wrapper{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000;
  opacity: .7;
  z-index: 6000;
}


</style>