// 地图坐标转换
var GPS = {
    PI: 3.14159265358979324,
    x_pi: 3.14159265358979324 * 3000.0 / 180.0,
    delta: function(lat, lon) {
      var a = 6378245.0 //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
      var ee = 0.00669342162296594323 //  ee: 椭球的偏心率。
      var dLat = this.transformLat(lon - 105.0, lat - 35.0)
      var dLon = this.transformLon(lon - 105.0, lat - 35.0)
      var radLat = lat / 180.0 * this.PI
      var magic = Math.sin(radLat)
      magic = 1 - ee * magic * magic
      var sqrtMagic = Math.sqrt(magic)
      dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI)
      dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI)
      return { 'lat': dLat, 'lon': dLon }
    },
  
    // BD-09 to GCJ-02（百度转火星）
    bd_decrypt: function(bdLat, bdLon) {
      var x = bdLon - 0.0065; var y = bdLat - 0.006
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi)
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi)
      var gcjLon = z * Math.cos(theta)
      var gcjLat = z * Math.sin(theta)
      return { 'lat': gcjLat, 'lon': gcjLon }
    },
    // GCJ-02 to BD-09
    bd_encrypt: function(gcjLat, gcjLon) {
      var x = gcjLon; var y = gcjLat
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi)
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi)
      bdLon = z * Math.cos(theta) + 0.0065
      bdLat = z * Math.sin(theta) + 0.006
      return { 'lat': bdLat, 'lon': bdLon }
    },
  
    // WGS-84 to GCJ-02
    gcj_encrypt: function(wgsLat, wgsLon) {
      if (this.outOfChina(wgsLat, wgsLon)) { return { 'lat': wgsLat, 'lon': wgsLon } }
  
      var d = this.delta(wgsLat, wgsLon)
      return { 'lat': wgsLat + d.lat, 'lon': wgsLon + d.lon }
    },
  
    // GCJ-02 to WGS-84（火星转GPS）
    gcj_decrypt: function(gcjLat, gcjLon) {
      if (this.outOfChina(gcjLat, gcjLon)) { return { 'lat': gcjLat, 'lon': gcjLon } }
      var d = this.delta(gcjLat, gcjLon)
      return { 'lat': gcjLat - d.lat, 'lon': gcjLon - d.lon }
    },
  
    outOfChina: function(lat, lon) {
      if (lon < 72.004 || lon > 137.8347) { return true }
      if (lat < 0.8293 || lat > 55.8271) { return true }
      return false
    },
    transformLat: function(x, y) {
      var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
      ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0
      ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0
      ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0
      return ret
    },
    transformLon: function(x, y) {
      var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
      ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0
      ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0
      ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0
      return ret
    },
    // GPS转火星
    wgs2gcj: function(lat, lon) {
      var a = 6378245.0 //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
      var ee = 0.00669342162296594323 //  ee: 椭球的偏心率。
      var dLat = this.transformLat(lon - 105.0, lat - 35.0)
      var dLon = this.transformLon(lon - 105.0, lat - 35.0)
      var radLat = lat / 180.0 * this.PI
      var magic = Math.sin(radLat)
      magic = 1 - ee * magic * magic
      var sqrtMagic = Math.sqrt(magic)
      dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI)
      dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI)
      var mgLat = Number(lat) + Number(dLat)
      var mgLon = Number(lon) + Number(dLon)
      return { 'lat': mgLat, 'lon': mgLon }
    },
    // 火星转百度
    gcj2bd: function(lat, lon) {
      var x = lon; var y = lat
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi)
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi)
      var bd_lon = z * Math.cos(theta) + 0.0065
      var bd_lat = z * Math.sin(theta) + 0.006
      return { 'lat': bd_lat, 'lon': bd_lon }
    }
  }
  
  export default GPS
  