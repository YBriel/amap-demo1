<template>
  <div>
    <el-input v-model="input" placeholder="请输入经纬度"></el-input>
    <el-button type="primary" @click="refreshLine">刷新经纬度</el-button>
    <div id="test-map"/>
  </div>
</template>

<script>
import {lazyAMapApiLoaderInstance} from 'vue-amap'

export default {
  data() {
    return {
      input: '',
      map: '', // 地图
      centerPoint: '115.842574,28.738859',
      //"https://restapi.amap.com/v3/direction/driving?strategy=0&origin=" + origin + "&destination=" + dest + "&extensions=base&key=231ce73f17b3dd7acadcc40bc0965aaf&waypoints=" + wayPoints
      // 轨迹数组，格式[{},{},...]
      path: [
        {
          name: '订单',
          path: [
            {orderId:1518426558025846784, lngLat:[115.881245,39.042484],tag:1,name:'中金花园'},
            {orderId:1518426300248117248, lngLat:[115.876634,39.062394],tag:1,name:'P1停车场'},
            {orderId:1518424909597265920, lngLat:[115.871648,39.052256],tag:1,name:'6号通道北口'},
            {orderId:1518426558025846784, lngLat:[115.91572,39.048258],tag:2,name:'城建小区'},
            {orderId:1518426300248117248, lngLat:[115.879499,39.062025],tag:2,name:'茂丰酒店'},
            {orderId:1518424909597265920, lngLat:[115.922299,39.067307],tag:2,name:'容城县政府'},
          ]
        }
      ]
    }
  },
  mounted() {
    this.createNav(this.centerPoint);
  },
  methods: {
    refreshLine() {
      let strings = this.input.split(";");
      this.path[0].path = [];
      for (let i = 0; i < strings.length; i++) {
        let arr = [];
        let string = strings[i].split(",");
        for (let j = 0; j < string.length; j++) {
          let number = parseFloat(string[j]);
          arr.push(number)
        }
        this.path[0].path.push(arr);
      }
      let pathElement = this.path[0].path[0];
      let pathElementTem = pathElement[0] + "," + pathElement[1];
      this.createNav(pathElementTem);
    },
    createNav: function (centerPointTem) {
      lazyAMapApiLoaderInstance.load().then(() => {
        let split = centerPointTem.split(",");
        this.map = new AMap.Map('test-map', {
          zooms: [13, 18], // 地图缩放范围
          // center: new AMap.LngLat(115.850573,28.732573)
          center: new AMap.LngLat(split[0], split[1]) //115.842574, 28.738859
        })
        AMapUI.load(['ui/misc/PathSimplifier'], (PathSimplifier) => {
          if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！')
            return
          }
          // 创建组件实例
          var pathSimplifierIns = new PathSimplifier({
            map: this.map,
            zIndex: 100, // 图层叠加顺序
            data: this.path, // 巡航路径
            // 获取巡航路径中的路径坐标数组
            getPath: (pathData, pathIndex) => {
              var points = pathData.path,
                  lnglatList = [];
              for (var i = 0, len = points.length; i < len; i++) {
                lnglatList.push(points[i].lngLat);
              }
              return lnglatList;
            },

            renderOptions: {
              pathLineStyle: {
                strokeStyle: 'red'
              },
              keyPointTolerance: 1,
              //  renderAllPointsIfNumberBelow:87,
              keyPointStyle: {
                radius: 4,
                fillStyle: "red",
                strokeStyle: "yellow",
                lineWidth: 1
              }
            },
            getHoverTitle: function (pathData, pathIndex, pointIndex) {
              if (pointIndex >= 0) {
                //point
              //  return pathData.name ;
                let pathElement = pathData.path[pointIndex];
                let string =pathElement.tag===1?'上车点':'下车点';
               return pathData.name + '，' + pathElement.orderId+string+pathElement.name;
              }
              return pathData.name + '，' + pathData.path[pointIndex];
             // return pathData.name + '，点数量' + pathData.points.length;
            }
          })
          // 创建巡航器
          var pathNavigator = pathSimplifierIns.createPathNavigator(0, {
            loop: true, // 是否循环
            speed: 1000 // 速度(km/h)
          })
          pathNavigator.start()
        })
      })
    }
  },
}
</script>

<style scoped>
#test-map {
  height: 650px;
}
</style>
