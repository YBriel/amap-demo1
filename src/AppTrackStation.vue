<template>
  <div>
    <el-input v-model="input" placeholder="请输入经纬度站点"></el-input>
    <el-button type="primary" @click="refreshLine">刷新经纬度1</el-button>
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
          name: '订单',
          path:[{
            arriveTime: 1651165082433,
            distance: 6296,
            duration: 765,
            ignore: false,
            lat: 39.042598,
            lng: 115.852789,
            orderId: 1519718226715451392,
            sort: 0,
            tag: 0
          }, {
            arriveTime: 1651165393433,
            distance: 8740,
            duration: 1076,
            ignore: false,
            lat: 39.042484,
            lng: 115.881245,
            orderId: 1519718226715451392,
            sort: 1,
            tag: 1
          }, {
            arriveTime: 1651165785433,
            distance: 12168,
            duration: 1468,
            ignore: false,
            lat: 39.056444,
            lng: 115.878588,
            orderId: 1519718525257621504,
            sort: 2,
            tag: 0
          }, {
            arriveTime: 1651165786433,
            distance: 12169,
            duration: 1469,
            ignore: false,
            lat: 39.056444,
            lng: 115.878588,
            orderId: 1519719409391738880,
            sort: 3,
            tag: 0
          }, {
            arriveTime: 1651166253433,
            distance: 16601,
            duration: 1936,
            ignore: false,
            lat: 39.029954,
            lng: 115.896956,
            orderId: 1519718525257621504,
            sort: 4,
            tag: 1
          }, {
            arriveTime: 1651166254433,
            distance: 16603,
            duration: 1937,
            ignore: false,
            lat: 39.029954,
            lng: 115.896956,
            orderId: 1519719409391738880,
            sort: 5,
            tag: 1
          }]
        }
      ]
    }
  },
  mounted() {
    this.createNav(this.centerPoint);
  },
  methods: {
    refreshLine: function () {
      this.path[0].path = [];
      let parse = JSON.parse(this.input);
      for (let i = 0; i < parse.length; i++) {
        var objTem={};
        objTem.lng=parse[i].lng;
        objTem.lat=parse[i].lat;
        objTem.ignore=parse[i].ignore;
        objTem.orderId=parse[i].orderId;
        objTem.tag=parse[i].tag;
        this.path[0].path.push(objTem);
      }
     // console.log(JSON.stringify( this.path[0].path))
      console.log(JSON.stringify( this.path[0].path[0]))
      let pathElementTem =this.path[0].path[0].lng+ "," + this.path[0].path[0].lat;
      console.log(JSON.stringify(pathElementTem))
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
                let arr=[];
                arr.push( points[i].lng);
                arr.push( points[i].lat);
                lnglatList.push(arr);
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
              console.log(JSON.stringify(pathData));
                 console.log(JSON.stringify(pathIndex));
               console.log(JSON.stringify(pointIndex));
              if (pointIndex >= 0) {
                //point
              //  return pathData.name ;
                let pathElement = pathData.path[pointIndex];
                let string =pathElement.tag===1?'上车点':'下车点';
                let ignore =pathElement.ignore?'已上车':'已下车';
               return pathData.name  + pathElement.orderId+string+"当前"+ignore;
              }
              console.log(JSON.stringify(pathData.path[pathIndex]));
           //   console.log(JSON.stringify(pathData));
             // console.log(JSON.stringify(pathIndex));
              return pathData.name + ',' + pathData.path[pointIndex];
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
