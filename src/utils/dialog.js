// 确认弹窗组件
import Vue from "vue"
import confirm from '../components/dialog.vue'
let confirmConstructor = Vue.extend(confirm);


// 确认弹窗组件
let theConfirm = function (text) {
    return new Promise((res, rej) => { //promise封装，ok执行resolve，no执行rejectlet
        let confirmDom = new confirmConstructor()
        let confirmDialog = confirmDom.$mount().$el
        document.body.appendChild(confirmDialog)  //new一个对象，然后插入body里面
        confirmDom.text = text;   //为了使confirm的扩展性更强，这个采用对象的方式传入，所有的字段都可以根据需求自定义
        confirmDom.success = function () {
            res()
            confirmDom.visible = false
        }
        confirmDom.close = function () {
            console.log("触发")
            rej()
            confirmDom.visible = false
            document.body.removeChild(confirmDialog) //body里面删除弹窗
        }
    })
}
export default theConfirm