<template>
  <div>
    <baidu-map
      style="width: 100%; height: 100vh"
      ak="hRyxciHaIxiLZ9c38jyLdMcRMWb1QoEa"
      id="allmap"
      @ready="mapReady"
      @click="onClickMap()"
    ></baidu-map>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
export default {
  components: {
    BaiduMap,
  },
  data() {
    return {
      map: {},
      points: [
        {
          lng: 112.58,
          lat: 26.89,
          url: "http://www.baidu.com",
          id: 1,
          name: "p1",
        },
        {
          lng: 112.59,
          lat: 26.9,
          url: "http://www.taobao.com",
          id: 2,
          name: "p2",
        },
        {
          lng: 112.57,
          lat: 26.88,
          url: "http://www.google.com",
          id: 3,
          name: "p3",
        },
      ],
      bPoints: [],
    };
  },
  mounted() {
    // this.bPoints = new Array();
    // setTimeout(() => {
    //   // 百度坐标系坐标(地图中需要使用这个)
    //   this.creatMap();
    // }, 1000);
  },
  methods: {
    creatMap() {
      this.map.centerAndZoom(new BMap.Point(112.591886, 26.905407), 14); // 设置中心点

      this.addMarker(this.points);
      //  addControl 将控件添加到地图，一个控件实例只能向地图中添加一次
      //  MapTypeControl 此类是负责切换地图类型的控件
    //   this.map.addControl(new BMap.MapTypeControl());
      //  enableScrollWheelZoom 启用滚轮放大缩小，默认禁用
      this.map.enableScrollWheelZoom(true);

      this.setZoom(this.bPoints);
    },
    //创建标注点并添加到地图中
    addMarker(points) {
      console.log("循环建立标注点");
      //循环建立标注点
      for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
        var point = new BMap.Point(points[i].lng, points[i].lat); //将标注点转化成地图上的点
        this.bPoints.push(point); // 添加到百度坐标数组 用于自动调整缩放级别
        var marker = new BMap.Marker(point); //将点转化成标注点
        this.map.addOverlay(marker); //将标注点添加到地图上
      }
    },
    // 根据点的数组自动调整缩放级别
    setZoom(bPoints) {
      // 根据提供的地理区域或坐标获得最佳的地图视野，返回的对象中包含center和zoom属性，分别表示地图的中心点和级别
      var view = this.map.getViewport(eval(bPoints));
      var mapZoom = view.zoom;
      var centerPoint = view.center;
      console.log("缩放", centerPoint, mapZoom);
      this.map.centerAndZoom({ center: centerPoint }, mapZoom);
    },
    mapReady({ BMap, map }) {
      //   console.log("ready", BMap, map);
      this.map = map;
      this.bPoints = new Array();
      this.creatMap();
    },
    onClickMap() {
      console.log("onClickMap");
    },
  },
};
</script>

<style>
</style>