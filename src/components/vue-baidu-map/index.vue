<template>
  <div>
    <baidu-map
      :center="center"

        ak="rYQHrpflPVCbHNRv7GPHO9QiA8Vlltsk"
      style="height: 600px; width: 100%;"
      @ready="onMapReady"
    >
      <slot></slot>
    </baidu-map>
  </div>
</template>

<script>

import BMapLib from 'BMapLib'
export default {
  name: "Map",

  data() {
    return {
      center: "广东省",
      zoom: 8,
    };
  },

  methods: {
    // 地图准备就绪时的回调函数
    onMapReady({ BMap, map }) {
        console.log('map',map)
      // 设置地图样式
      map.setMapStyle({
        styleJson: [
          {
            featureType: "water",
            elementType: "all",
            stylers: {
              color: "#d1d1d1",
            },
          },
          {
            featureType: "land",
            elementType: "all",
            stylers: {
              color: "#f3f3f3",
            },
          },
          {
            featureType: "boundary",
            elementType: "geometry",
            stylers: {
              color: "#fefefe",
            },
          },
          {
            featureType: "railway",
            elementType: "all",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              color: "#dadada",
            },
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              color: "#ffffff",
            },
          },
          {
            featureType: "arterial",
            elementType: "labels",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "green",
            elementType: "all",
            stylers: {
              color: "#d1d1d1",
            },
          },
          {
            featureType: "subway",
            elementType: "all",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "manmade",
            elementType: "all",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "local",
            elementType: "all",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "arterial",
            elementType: "labels",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "boundary",
            elementType: "geometry.fill",
            stylers: {
              color: "#fefefe",
            },
          },
          {
            featureType: "building",
            elementType: "all",
            stylers: {
              color: "#d1d1d1",
            },
          },
          {
            featureType: "label",
            elementType: "labels.text.fill",
            stylers: {
              color: "#999999",
            },
          },
        ],
      });

      // 创建区块对象
      const district = new BMapLib.AreaRestriction();

      // 设置区块限制级别
      district.setLevel(10);

      // 将区块对象绑定到地图上
      district.setMap(map);

      // 绑定区块选中事件
      district.addEventListener("onhighlight", function(e) {
        // 获取选中区块的名称
        const name = e.name;

        // 根据选中区块的名称，设置不同的颜色
        switch (name) {
          case "广州市":
            e.poly.setFillColor("red");
            break;
          case "深圳市":
            e.poly.setFillColor("blue");
            break;
          case "珠海市":
            e.poly.setFillColor("green");
            break;
          default:
            e.poly.setFillColor("gray");
            break;
        }

        // 设置区块的边框颜色
        e.poly.setStrokeColor("white");
        e.poly.setStrokeWeight(1);
        e.poly.setStrokeOpacity(0.8);
      });

      // 绑定区块取消选中事件
      district.addEventListener("oncancel", function(e) {
        // 将区块颜色设置为灰色
        e.poly.setFillColor("gray");

        // 设置区块的边框颜色
        e.poly.setStrokeColor("white");
        e.poly.setStrokeWeight(1);
        e.poly.setStrokeOpacity(0.8);
      });
      // 创建地图点击事件
      map.addEventListener("click", function(e) {
        // 获取点击位置的经纬度
        const point = new BMap.Point(e.point.lng, e.point.lat);

        // 获取当前地图的缩放级别
        const zoom = map.getZoom();

        // 判断当前缩放级别是否小于指定级别，如果小于，则放大地图
        if (zoom < 10) {
          map.setZoom(10);
        }

        // 创建地图标注
        const marker = new BMap.Marker(point);

        // 将标注添加到地图上
        map.addOverlay(marker);
      });
    },

    render: function(createElement) {
      return createElement("div", {
        attrs: {
          id: "map",
        },
        style: {
          height: "100%",
          width: "100%",
        },
      });
    },
  },
};
</script>

<style scoped>
/* 设置地图容器的样式 */
#map {
  height: 100%;
  width: 100%;
}
</style>
