/* 失效问题 */
const loseEfficacy = () => import('../pages/loseEfficacy/model')

/* 订单管理 */
const Order = () => import('../pages/order-manage')
const printReportShow = () => import('../pages/order-manage/order-list')
const ProductManage = () => import('../pages/order-manage/product-manage')
const ProductionList = () => import('../pages/order-manage/product-manage/production-list')
const ReviewManage = () => import('../pages/order-manage/product-manage/review-manage')
const ReturnGoods = () => import('../pages/order-manage/return-goods')

/* 产品管理 */
const Goods = () => import('../pages/goods-manage')
const GoodsList = () => import('../pages/goods-manage/goods-list')
const GoodsClassify = () => import('../pages/goods-manage/goods-classify')

/* 百度地图 */
const Map = () => import('../pages/map-manage')
const BaiduMap = () => import('../pages/map-manage/baidu-map')
const MapArea = () => import('../pages/map-manage/baidu-map/map-area')
const MapZoom = () => import('../pages/map-manage/baidu-map/map-zoom')
const GaodeMap = () => import('../pages/map-manage/gaode-map')

/* vue使用技巧 */
const vueSkill = () => import("../pages/vueSkill")
const defect = ()=> import("../pages/vueSkill/defect")
const communication = ()=> import("../pages/vueSkill/communication")

/* 流程图 */
const flowchart = ()=> import("../pages/flowchart")
const start = () => import("../pages/flowchart/start")

/* 需要权限判断的路由 */
const dynamicRoutes = [
    {
        path:'/loseEfficacy',
        component:loseEfficacy,
        name:"loseEfficacy",
        meta: {
            name: '失效问题',
            icon: 'icon-email'
        },
        children: [
            {
                path: 'loseEfficacy',
                name: 'loseEfficacy',
                hidden: false,
                iframeComponent: 'loseEfficacy',
                component: loseEfficacy,
                meta: {
                    name: 'v-model',
                    icon: 'icon-quit'
                }
            },
        ]
    },
    {
        path: '/order',
        component: Order,
        name: 'order-manage',
        meta: {
            name: '订单管理',
            icon: 'icon-email'
        },
        children: [
            {
                path: 'printReportShow',
                name: 'printReportShow',
                hidden: false,
                iframeComponent: 'printReportShow',
                component: printReportShow,
                meta: {
                    name: '订单列表',
                    icon: 'icon-quit'
                }
            },
            {
                path: 'product',
                name: 'product-manage',
                component: ProductManage,
                meta: {
                    name: '生产管理',
                    icon: 'icon-service'
                },
                children: [
                    {
                        path: 'list',
                        name: 'product-list',
                        component: ProductionList,
                        meta: {
                            name: '生产列表',
                            icon: 'icon-nav'
                        }
                    },
                    {
                        path: 'review',
                        name: 'review-manage',
                        component: ReviewManage,
                        meta: {
                            name: '审核管理',
                            icon: 'icon-finance-manage'
                        }
                    }
                ]
            },
            {
                path: 'returnGoods',
                name: 'return-goods',
                component: ReturnGoods,
                meta: {
                    name: '退货管理',
                    icon: 'icon-product-manage'
                }
            }
        ]
    },
    {
        path: '/goods',
        component: Goods,
        name: 'goods',
        meta: {
            name: '产品管理',
            icon: 'icon-order-manage'
        },
        children: [
            {
                path: 'list',
                name: 'goods-list',
                component: GoodsList,
                meta: {
                    name: '产品列表',
                    icon: 'icon-home'
                }
            },
            {
                path: 'classify',
                name: 'goods-classify',
                component: GoodsClassify,
                meta: {
                    name: '产品分类',
                    icon: 'icon-product-manage'
                }
            }
        ]
    },{
        path:'/map',
        component:Map,
        name:'map',
        meta:{
            name:'图表地图',
            icon:"icon-product-manage"
        },
        children:[{
            path:"baidumap",
            name:"baidu-map",
            component:BaiduMap,
            meta:{
                name:"百度地图",
                icon: 'icon-product-manage'
            },
            children:[{
                path:"maparea",
                name:"map-area",
                component:MapArea,
                meta:{
                    name:"区域显示",
                    icon: 'icon-product-manage'
                }
            },{
                path:"mapzoom",
                name:"map-zoom",
                component:MapZoom,
                meta:{
                    name:"标点缩放",
                    icon: 'icon-product-manage'
                }
            }]
        },{
            path:"gaodemap",
            name:"gaode-map",
            component:GaodeMap,
            meta:{
                name:"高德地图",
                icon: 'icon-product-manage'
            }
        }]
    },{
        path:"/vueSkill",
        component:vueSkill,
        name:"vueSkill",
        meta:{
            name:"使用技巧",
            icon:"icon-product-manage"
        },
        children:[{
            path:"/defect",
            component:defect,
            name:"defect",
            meta:{
                name:"缺陷",
                icon: '',
            }
        },{
            path:"/communication",
            component:communication,
            name:"communication",
            meta:{
                name:"通信",
                icon:""
            }
        }]
    },{
        path:"/flowchart",
        component:flowchart,
        name:"flowchart",
        meta:{
            name:"流程图"
        },
        children:[{
            path:"/start",
            component:start,
            name:"start",
            meta:{
                name:"起步",
                icon:"icon-product-manage"
            }
        }]
    }
]

export default dynamicRoutes
