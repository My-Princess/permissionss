import confirm from '../components/confirm/dlsConfirm'

export default function (Vue) {
  const Constructor = Vue.extend(confirm)
  const Instance = new Constructor()
  Instance.$mount()
  document.body.appendChild(Instance.$el)
  Vue.prototype.$dlsConfirm = (content) => {

    Instance.showConfirm = true
    Instance.content = content
    return new Promise((res, rej) => {
      Instance.confirm = function () {
        console.log("confirm")
        res()
        Instance.showConfirm = false
      }
      Instance.close = function () {
        console.log("closessss")
        rej()
        Instance.showConfirm = false
      }
    })
  }
}