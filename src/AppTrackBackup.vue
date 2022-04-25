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
      // 轨迹数组，格式[{},{},...]
      path: [
        {
          name: '订单轨迹',
          path: [[115.859384, 28.687274], [115.859323, 28.68727], [115.859323, 28.68727], [115.859323, 28.687096], [115.859319, 28.686931], [115.859297, 28.686823], [115.859288, 28.686758], [115.859288, 28.686758], [115.858129, 28.687209], [115.857704, 28.687383], [115.85763, 28.687409], [115.857287, 28.687543], [115.855881, 28.688108], [115.855043, 28.688433], [115.855043, 28.688433], [115.854974, 28.68855], [115.854948, 28.688628], [115.854883, 28.688928], [115.854883, 28.688928], [115.855161, 28.689462], [115.85543, 28.689926], [115.855851, 28.690538], [115.856237, 28.690985], [115.856458, 28.691181], [115.85724, 28.691914], [115.857513, 28.69217], [115.85776, 28.692339], [115.858503, 28.692778], [115.85875, 28.692908], [115.859036, 28.693043], [115.859457, 28.693207], [115.859887, 28.693351], [115.860286, 28.693507], [115.860386, 28.693546], [115.860799, 28.693707], [115.861072, 28.693798], [115.861341, 28.693893], [115.861814, 28.694063], [115.861944, 28.694102], [115.862899, 28.694431], [115.863885, 28.6948], [115.864227, 28.694952], [115.864275, 28.694978], [115.864583, 28.695117], [115.865069, 28.695312], [115.865764, 28.695586], [115.866593, 28.695907], [115.866749, 28.696007], [115.867023, 28.696276], [115.867036, 28.696285], [115.867318, 28.696593], [115.86799, 28.697331], [115.868911, 28.698346], [115.868958, 28.698394], [115.869136, 28.69839], [115.86931, 28.698589], [115.869388, 28.698689], [115.869505, 28.698828], [115.869809, 28.699188], [115.870686, 28.700239], [115.870707, 28.70026], [115.871263, 28.70089], [115.871424, 28.701072], [115.871632, 28.701341], [115.87168, 28.701406], [115.871888, 28.701658], [115.872005, 28.70181], [115.872166, 28.702031], [115.873116, 28.70332], [115.87355, 28.703915], [115.87355, 28.703915], [115.873303, 28.704071], [115.872895, 28.703524], [115.872609, 28.703129]]
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
              return pathData.path
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
                return pathData.name ;
             //   return pathData.name + '，' + pathData.points[pointIndex].name;
              }
              return pathData.name;
             // return pathData.name + '，点数量' + pathData.points.length;
            }
          })
          // 创建巡航器
          var pathNavigator = pathSimplifierIns.createPathNavigator(0, {
            loop: true, // 是否循环
            speed: 1500 // 速度(km/h)
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
