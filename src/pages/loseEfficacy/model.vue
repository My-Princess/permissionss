<template>
<div>
<Map></Map>
</div>
  <!-- <div id="map-container" ref="mapContainer" style="width: 100%; height: 100vh;"></div> -->
</template>

<script>
import Map from '../../components/vue-baidu-map/index.vue'
  export default {
    components:{
Map
    }
    // created() {

    // },
//     mounted() {
//   // 监听百度地图 JavaScript API 的 load 事件
//   window.addEventListener('load', () => {
//     // 创建地图对象
//     const map = new BMap.Map(this.$refs.mapContainer)
//     console.log("map",map)

//       // 设置地图中心点和缩放级别
//       const point = new BMap.Point(113.266531, 23.131709)
//       map.centerAndZoom(point, 9)
//       // 添加地图控件
//       map.addControl(new BMap.NavigationControl())
//       map.addControl(new BMap.ScaleControl())
//       map.addControl(new BMap.OverviewMapControl())
//       map.addControl(new BMap.MapTypeControl())
//       map.setCurrentCity('广州')

//       // 添加地图点击事件监听器
//       map.addEventListener('click', (event) => {
//         const {lng, lat} = event.point
//         // 调用下钻函数，传递经纬度参数
//         this.drillDown(lng, lat)
//       })
//   })
// },

    // methods: {
    //   drillDown(lng, lat) {
    //     // 创建新的地图实例，设置中心点和缩放级别
    //     const map = new BMap.Map('map-container')
    //     const point = new BMap.Point(lng, lat)
    //     map.centerAndZoom(point, 12)
    //     // 添加地图控件
    //     map.addControl(new BMap.NavigationControl())
    //     map.addControl(new BMap.ScaleControl())
    //     map.addControl(new BMap.OverviewMapControl())
    //     map.addControl(new BMap.MapTypeControl())
    //     map.enableScrollWheelZoom(true)
    //     // 添加地图覆盖物，如标记点和信息窗口等
    //     const marker = new BMap.Marker(point)
    //     map.addOverlay(marker)
    //     const infoWindow = new BMap.InfoWindow('这是一个信息窗口')
    //     marker.addEventListener('click', () => {
    //       map.openInfoWindow(infoWindow, point)
    //     })
    //   }
    // }
  }
</script>

<style>
