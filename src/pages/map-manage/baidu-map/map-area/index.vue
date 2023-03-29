<template>
  <div>
    <baidu-map
      style="width: 100%; height: 100vh"
      ak="rYQHrpflPVCbHNRv7GPHO9QiA8Vlltsk"
      id="allmap"
      @ready="mapReady"
      @click="onClickMap()"
    ></baidu-map>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import mapResult from "../../../../utils/mapResult";
import GPS from "../../../../utils/gps";
import BMapLib from '@/utils/GeoUtils'

export default {
  components: {
    BaiduMap,
  },
  data() {
    return {
      map: {},
      mapResult: [],
      centerPoint: [],
      RGB: "",
      allPoints: [],
      orgInfo: {},
      indicatorSub: [
        {
          sumMonth: "2022-02",
          orgId: "200000000",
          orgCode: null,
          orgName: "广州",
          orgGrade: "1",
          provinceId: null,
          province: null,
          cityId: null,
          cityName: null,
          substId: null,
          substName: null,
          branchId: null,
          branchName: null,
          stationId: null,
          stationName: null,
          cellId: null,
          cellCode: null,
          cellName: null,
          khCnt: "6225728",
          ydNetCnt: "193156",
          ydCzCnt: "6779060",
          ydJzCnt: "-3899",
          ydXhCnt: "197055",
          kdNetCnt: "42509",
          kdJfCnt: "3155643",
          kdJzCnt: "9703",
          kdXhCnt: "32806",
          itvNetCnt: "15919",
          itvJfCnt: "1439025",
          itvJzCnt: "7025",
          itvXhCnt: "8894",
          ghNetCnt: "2667",
          ghJfCnt: "2294733",
          ghJzCnt: "-10714",
          ghXhCnt: "13381",
          arpu: "     103188.51",
          ydArpu: "372189860.35",
          kdArpu: "221092908.66",
          itvArpu: "8876281.51",
          ghArpu: "56649862.98",
          valueGrade: null,
          riskGrade: null,
          buildingCnt: "3214859",
          roomCnt: "13348881",
          dxywRoomCnt: "2938212",
          kdRoomRate: "22.01",
          gPortSum: "6450420",
          freeGPortSum: "2958374",
          gPortUsedRate: "53.09",
          isQz: null,
          stScore: "低",
          fullName: null,
          cellType: null,
          areaId: null,
          areaName: null,
          custArpu: "165.75",
          arpuChange: "-64027184.65",
          kdXhRate: 1.04,
          kdArpuChange: "-3004284.98",
          ydXhRate: "2.91",
          ydArpuChange: "-6308457.01",
          itvXhRate: "0.62",
          itvArpuChange: "-575471.51",
          ghXhRate: 0.58,
          ghArpuChange: "-2485187.08",
          gridType: null,
          beMonArpu: "-5.84",
          ywywRoomCnt: "892999",
          ywzyRate: "76.69",
          zxCzCnt: "70538",
          zxRwCnt: "1052",
          zxXhCnt: "820",
          yywCzCnt: "21182",
          yywRwCnt: "777",
          yywXhCnt: "479",
          kdRoomRateChange: null,
          kdRate: "17.21",
          kdRateChange: null,
          zxFee: null,
          yywFee: null,
          sykhFee: null,
          xykhFee: null,
          gzkhFee: null,
          qwwfRate: "57.89",
          tykjRate: "1.18",
          qwwfRwCnt: "20433",
          qwwfCzCnt: "1826786",
          tykjRwCnt: "1853",
          tykjCzCnt: "37330",
          qwwfRateChange: "0.26",
          tykjRateChange: "0.03",
          beQwwfRwCnt: "-28.86",
          beQwwfCzCnt: "0.76",
          beTykjRwCnt: "-21.05",
          beTykjCzCnt: "3.41",
          beYdNetCnt: "-13.30",
          beYdCzCnt: "-0.06",
          beYdXhCnt: "13.89",
          beKdNetCnt: "-8.35",
          beKdJfCnt: "0.31",
          beKdXhCnt: "-40.79",
          beItvNetCnt: "-22.25",
          beItvJfCnt: "0.49",
          beItvXhCnt: "-47.14",
          beGhNetCnt: "-41.70",
          beGhCzCnt: "-0.46",
          beGhXhCnt: "-29.87",
          zxRwCntRate: "-47.56",
          zxXhCntRate: "19.01",
          yywRwCntRate: "29.28",
          yywXhCntRate: "-30.07",
          kdywRoomCnt: null,
          bemonkhcnt: "0.14",
          bemoncustarpu: "-5.97",
        },
      ],
    };
  },
  mounted() {
    // setTimeout(() => {
    // this.creatMap(mapResult);
    // }, 1000);
  },
  methods: {
    creatMap(data) {
      this.mapResult = data;
      // 初始化中心点坐标
      this.centerPoint = [];
      // 清除
      if (this.map.clearOverlays) {
        this.map.clearOverlays();
      }
      var point = [];
      this.allPoints = [];
      /*
        1.遍历获取坐标
      */
      for (var i = 0; i < data.length; i++) {
        var polygonArray = [];
        var polygonPoint = [];
        // 坐标 {lat: "",lon: "",}
        var coordinates = this.pointDeal(data[i].points);
        for (var k = 0; k < coordinates.length; k++) {
          var obj = GPS.wgs2gcj(coordinates[k].lon, coordinates[k].lat);
          var objbd = GPS.gcj2bd(obj.lat, obj.lon);
          // 初始化地图,设置中心点坐标
          polygonArray.push(new BMap.Point(objbd.lon, objbd.lat));
          point.push(new BMap.Point(objbd.lon, objbd.lat));
          polygonPoint.push(new BMap.Point(objbd.lon, objbd.lat));
        }
        console.log("处理后的坐标", polygonArray);
        const imgIcon = require("../../../../assets/dingwei-blue.png");
        // new BMap.Icon(url,size,opts) size 宽高， opts 偏移
        var tagMarkerIcon = new BMap.Icon(imgIcon, new BMap.Size(32, 32), {
          imageOffset: new BMap.Size(0, 0 - 13 * 25), // 设置图片偏移
        });
        var centerPoint = {
          id: "",
          point: "",
          grade: "",
          indicators: "",
          name: "",
        };
        // 中心点信息
        centerPoint.id = data[i].id;
        centerPoint.grade = data[i].grade;
        centerPoint.name = data[i].name;
        // getViewport()根据提供的地理区域或坐标获得最佳的地图视野，返回的对象中包含center和zoom属性
        centerPoint.point = this.map.getViewport(eval(polygonPoint)).center;
        centerPoint.indicators = data[i].indicators;

        for (var z = 0; z < this.centerPoint.length; z++) {
          // 兼容没有坐标的数据
          if (this.centerPoint[z].point == undefined) {
            continue;
          }
          // 如果点重叠了，随机取面的坐标点中的一个
          if (
            this.map.getViewport(eval(polygonPoint)).center.lat ==
              this.centerPoint[z].point.lat &&
            this.map.getViewport(eval(polygonPoint)).center.lng ==
              this.centerPoint[z].point.lng
          ) {
            // var number = random(0, coordinates.length)
            var number = 0;
            centerPoint.point = point[number];
          }
        }

        this.centerPoint[i] = centerPoint;

        if (data[i].indicators != null && data[i].indicators.length > 0) {
          var myIcon;
          this.RGB = "#1E90FF";
          this.centerPoint[i].rgb = "#1E90FF";
          const imgIcon = require("../../../../assets/dingwei-blue.png");

          myIcon = new BMap.Icon(imgIcon, new BMap.Size(32, 32));

          this.map.addOverlay(marker);

          this.RGB = "#1E90FF";

          var polygon = new BMap.Polygon(polygonArray, {
            strokeWeight: 1, // 设置线的粗细
            strokeColor: "#1C1C1C", // 设置线的颜色
            strokeOpacity: 0.5, // 设置线的透明度
            fillColor: this.RGB, // 设置背景颜色
            // fillOpacity: 0.6, // 设置背景颜色透明度
            strokeStyle: "solid", // 设置实线
          }); // 创建多边形

          this.allPoints.push(polygon);
          var marker = new BMap.Marker(
            this.map.getViewport(eval(polygonArray)).center,
            {
              icon: tagMarkerIcon,
            }
          );
          var lableName = data[i].name.replace("分公司", "");

          if (data[i].grade > 3) {
            // 片区跟网格不加载标签
            lableName = "";
          }
          var label = new BMap.Label(lableName.replace("分公司", ""), {
            offset: new BMap.Size(-15, 2),
          });
          label.setStyle({
            color: "#1C1C1C",
            fontSize: "12px",
            backgroundColor: "0.05",
            border: "0",
            fontWeight: "bold",
            fontFamily: "微软雅黑",
          });
          marker.setLabel(label);
          this.map.addOverlay(marker);

          this.map.addOverlay(polygon); // 增加多边形
        } else {
          var polygon = new BMap.Polygon(polygonArray, {
            strokeWeight: 1, // 设置线的粗细
            strokeColor: "#000", // 设置线的颜色
            strokeOpacity: 1, // 设置线的透明度
            fillColor: "#fff", // 设置背景颜色
            fillOpacity: 0.8, // 设置背景颜色透明度
            strokeStyle: "dashed", // 设置虚线
          }); // 创建多边形

          this.allPoints.push(polygon);
          var marker = new BMap.Marker(
            this.map.getViewport(eval(polygonArray)).center,
            {
              icon: tagMarkerIcon,
            }
          );
          var lableName = data[i].name.replace("分公司", "");
          if (data[i].grade > 3) {
            // 片区跟网格不加载标签
            lableName = "";
          }
          var label = new BMap.Label(lableName.replace("分公司", ""), {
            offset: new BMap.Size(-15, 2),
          });
          label.setStyle({
            color: "#1C1C1C",
            fontSize: "5px",
            backgroundColor: "0.05",
            border: "0",
            fontWeight: "bold",
            fontFamily: "微软雅黑",
          });
          marker.setLabel(label);
          this.map.addOverlay(marker);

          this.map.addOverlay(polygon); // 增加多边形
        }
      }
      setTimeout(() => {
        this.setZoom(point);
      }, 100);

      // // 单击获取点击的经纬度
      // this.map.addEventListener("touchstart", (e) => {
      //   // 判断点击的是不是覆盖物
      //   // console.log(e.overlay);
      //   // if (e.overlay) {
      //   var point = new BMap.Point(e.point.lng, e.point.lat);
      //   for (var i = 0; i < this.allPoints.length; i++) {
      //     // 判断点在哪一个
      //     if (BMapLib.GeoUtils.isPointInPolygon(point, this.allPoints[i])) {
      //       this.removeOverlay(e.point, this.mapResult[i], this.allPoints[i]);
      //     }
      //   }
      //   // }
      // });
            // 单击获取点击的经纬度
      this.map.addEventListener('click', e => {
        console.log("点击点击",e)
        // 判断点击的是不是覆盖物
        // console.log(e.overlay);
        // if (e.overlay) {
        var point = new BMap.Point(e.point.lng, e.point.lat)
        for (var i = 0; i < this.allPoints.length; i++) {
          // 判断点在哪一个
          if (BMapLib.GeoUtils.isPointInPolygon(point, this.allPoints[i])) {
            this.removeOverlay(e.point, this.mapResult[i], this.allPoints[i])
          }
        }
        // }
      })
    },
    // 处理坐标数据
    pointDeal(point) {
      var pointObject = {
        lat: "",
        lon: "",
      };
      if (point != null && point != "未落图") {
        var ponitArray = point.split(";");

        var coordinates = [];
        for (var i = 0; i < ponitArray.length; i++) {
          pointObject = {
            lat: "",
            lon: "",
          };
          var temp = ponitArray[i].split(",");
          pointObject.lat = temp[0];
          pointObject.lon = temp[1];
          coordinates.push(pointObject);
        }
        return coordinates;
      } else {
        return pointObject;
      }
    },
    // 根据点的数组自动调整缩放级别
    setZoom(bPoints) {
      var view = this.map.getViewport(eval(bPoints));
      var mapZoom = view.zoom;
      var centerPoint = view.center;
      console.log("map", view.zoom, view.center);
      this.map.centerAndZoom(centerPoint, mapZoom);
    },
    // 删除覆盖物并进行打点
    removeOverlay(point, data, polygon) {
      console.log("覆盖物",data)
      // 获取覆盖物的颜色
      this.mapFloatColor = polygon.getFillColor();
      console.log("覆盖物的颜色",this.mapFloatColor)
      if (this.mapFloatColor != "#fff") {
        // 获取所有覆盖物
        var allOverlay = this.map.getOverlays();
        // 删除点
        for (var i = 0; i < allOverlay.length; i++) {
          if (
            allOverlay[i].toString() == "[object Marker]" &&
            allOverlay[i].getLabel() == null
          ) {
            this.map.removeOverlay(allOverlay[i]);
          }
        }
        // console.log(this.indicatorSub);
        console.log("地图点击了呀");
          console.log('数据',data);
          var marker = new BMap.Marker(point);
          this.map.addOverlay(marker);
          // if (data != undefined) {
          //   this.orgInfo.id = data.id;
          //   this.orgInfo.levelGrade = data.grade;
          //   this.orgInfo.name = data.name;
          //   this.queryMapIndicatorInfo(data.id, data.grade, "1");
          // }
          // this.mapNext = true;
          // $scope.$apply();
        
      } else {
        console.log("是白色");
      }
    },
    mapReady({ BMap, map }) {
      console.log("ready", BMap, map);
      this.map = map;
      this.creatMap(mapResult);
    },
    onClickMap() {
      console.log("onClickMap");
    },
  },
};
</script>

<style>
</style>