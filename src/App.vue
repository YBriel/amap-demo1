<template>
    <div id="test-map" />
</template>

<script>
    import { lazyAMapApiLoaderInstance } from 'vue-amap'
    export default {
        data() {
            return {
                map: '', // 地图
                // 轨迹数组，格式[{},{},...]
                path: [
                    {
                        path: [
                            [115.841818,28.740776],
                            [115.853319,28.742808],
                            [115.867052,28.742507],
                            [115.879755,28.742055],
                            [115.890055,28.745517]
                        ]
                    }
                ]
            }
        },
        mounted() {
            lazyAMapApiLoaderInstance.load().then(() => {
                this.map = new AMap.Map('test-map', {
                    zooms: [13, 18], // 地图缩放范围
                    center: new AMap.LngLat(115.850573,28.732573)
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
                        }
                    })
                    // 创建巡航器
                    var pathNavigator = pathSimplifierIns.createPathNavigator(0, {
                        loop: true, // 是否循环
                        speed: 2000 // 速度(km/h)
                    })
                    pathNavigator.start()
                })
            })
        }
    }
</script>

<style scoped>
    #test-map{
        height: 650px;
    }
</style>
