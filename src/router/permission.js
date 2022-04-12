import router from "./index"
import store from "../store/index"

router.beforeEach((to,from,next) =>{
    if(!store.state.UserToken){
        console.log('matched',to.matched,to.matched.some(record => record.meta.requiresAuth))
        // 未登录  页面是否需要登录
        if(to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)){
            next();
        }else{
            next({
                path:"/login"
            })
        }
    }else{
        // 用户已经登录  路由的访问权限
        console.log('已经登录',store.state.permission.permissionList)
        if(!store.state.permission.permissionList){
            store.dispatch("permission/FETCH_PERMISSION").then(() =>{
                next({
                    path:to.path
                })
            })
        }else{
            // store存在权限
            if(to.path !== "/login"){
                console.log('嘻嘻')
                next();
            }else{
                console.log('哈哈')
                next(from.fullPath)
            }
        }
    }
})