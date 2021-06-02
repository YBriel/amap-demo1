<template lang="html">
    <div>
    <div style="width:100%;height:600px;">
        <div class="container">
            <div class="search-box">
                <input
                        v-model="searchKey"
                        type="search"
                        id="search">
                <button @click="searchByHand">搜索</button>
                <div class="tip-box" id="searchTip"></div>
            </div>
            <!--
              amap-manager： 地图管理对象
              vid：地图容器节点的ID
              zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
              center： 地图中心点坐标值
              plugin：地图使用的插件
              events： 事件:events="picClick(marker.position)"
            -->
            <el-amap class="amap-box"
                     :amap-manager="amapManager"
                     :vid="'amap-vue'"
                     :zoom="zoom"
                     :plugin="plugin"
                     :center="center"
                     :events="events"
            >
                <!-- 标记 -->
                <el-amap-marker :position="mark.position" icon="./leaf.ico"></el-amap-marker>

                <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :key="index" :events="marker.events"></el-amap-marker>
                <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>

                <!-- <el-amap-marker v-for="(marker, index) in markers" :position="markers[index].position" :key="index" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>-->
            </el-amap>
        </div>
        <div class="toolbar">
            <!--      <button type="button" name="button" v-on:click="toggleVisible">toggle first marker</button>
                  <button type="button" name="button" v-on:click="changePosition">change position</button>
                  <button type="button" name="button" v-on:click="chnageDraggle">change draggle</button>-->
            <button type="button" name="button" v-on:click="addMarker">add marker</button>
            <button type="button" name="button" v-on:click="removeMarker">remove marker</button>
            <router-link to="/track">登录</router-link>
        </div>
    </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'

    let amapManager = new AMapManager()

    export default {
        data() {
            let self = this
            return {
                address: null,
                searchKey: '',
                amapManager,
                mark: {
                   // position: [115.84179, 28.74188]
                },
                markers: [],
                windows: [],
                window: '',
                searchOption: {
                    city: '全国',
                    citylimit: true
                },
                center: [121.329402, 31.228667],
                zoom: 17,
                lng: 0,
                lat: 0,
                loaded: false,
                events: {
                    init() {
                        console.log("哈哈哈1");
                        lazyAMapApiLoaderInstance.load().then(() => {
                            self.initSearch()
                        })
                    },
                    // 点击获取地址的数据
                    click(e) {
                        console.log("哈哈哈2");
                        // console.log(e)
                        self.marker = [];
                        let {lng, lat} = e.lnglat;
                        self.lng = lng;
                        self.lat = lat;
                        self.center = [lng, lat];
                        let marker = {
                            position: [self.lng, self.lat]
                        };
                        self.mark.position = [self.lng, self.lat];

                        console.log("selfMark是" + self.mark);
                        // 这里通过高德 SDK 完成。
                        let geocoder = new AMap.Geocoder({
                            radius: 1000,
                            extensions: 'all'
                        });
                        geocoder.getAddress([lng, lat], function (status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                if (result && result.regeocode) {
                                    console.log(result.regeocode.formattedAddress)
                                    self.address = result.regeocode.formattedAddress
                                    self.searchKey = result.regeocode.formattedAddress
                                    self.$nextTick()
                                }
                            }
                        })
                    }
                },
                // 一些工具插件
                plugin: [
                    {
                        pName: 'Geocoder',
                        events: {

                            init(o) {
                                console.log("Geocoder")
                                console.log(o.getAddress())
                            }
                        }
                    },
                    {
                        // 定位
                        pName: 'Geolocation',
                        events: {
                            init(o) {
                                console.log("哈哈哈4");
                                // o是高德地图定位插件实例
                                console.log("哈哈哈");
                                console.log(o);
                                console.log("哈哈哈");
                                o.getCurrentPosition((status, result) => {
                                    console.log("哈哈哈5");
                                    console.log(result);
                                    if (result && result.position) {
                                        // 设置经度
                                        self.lng = result.position.lng;
                                        // 设置维度
                                        self.lat = result.position.lat;
                                        // 设置坐标
                                        self.center = [self.lng, self.lat];
                                        // self.markers.push([self.lng, self.lat]);
                                        let marker = {
                                            position: [self.lng, self.lat]
                                        };
                                        self.markers.push(marker);

                                        // load
                                          self.loaded = true;
                                          // 页面渲染好后
                                          self.$nextTick()
                                    }
                                })
                            }
                        }
                    },
                    {
                        // 工具栏
                        pName: 'ToolBar',
                        events: {

                            init(instance) {
                                console.log("哈哈哈6")
                                // console.log(instance);
                            }
                        }
                    },
                    {
                        // 鹰眼
                        pName: 'OverView',
                        events: {

                            init(instance) {
                                console.log("哈哈哈7")
                                // console.log(instance);
                            }
                        }
                    },
                    {
                        // 地图类型
                        pName: 'MapType',
                        defaultType: 0,
                        events: {

                            init(instance) {
                                console.log("哈哈哈8")
                                // console.log(instance);
                            }
                        }
                    },
                    {
                        // 搜索
                        pName: 'PlaceSearch',
                        events: {

                            init(instance) {
                                console.log("哈哈哈9")
                                // console.log(instance)
                            }
                        }
                    }
                ]
            }
        },
        methods: {
            initSearch() {
                console.log("哈哈哈10");
                let vm = this;
                let map = this.amapManager.getMap()
                AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
                    var poiPicker = new PoiPicker({
                        input: 'search',
                        placeSearchOptions: {
                            map: map,
                            pageSize: 10
                        },
                        suggestContainer: 'searchTip',
                        searchResultsContainer: 'searchTip'
                    })
                    vm.poiPicker = poiPicker
                    // 监听poi选中信息
                    poiPicker.on('poiPicked', function (poiResult) {
                        // console.log(poiResult)
                        console.log("哈哈哈11");
                        let source = poiResult.source
                        let poi = poiResult.item
                        if (source !== 'search') {
                            console.log("哈哈哈12");
                            poiPicker.searchByKeyword(poi.name)
                        } else {
                            console.log("哈哈哈3");
                            poiPicker.clearSearchResults()
                            vm.markers = []
                            let lng = poi.location.lng
                            let lat = poi.location.lat
                            let address = poi.cityname + poi.adname + poi.name
                            vm.center = [lng, lat]
                            vm.markers.push([lng, lat])
                            vm.lng = lng
                            vm.lat = lat
                            vm.address = address
                            vm.searchKey = address
                        }
                    })
                })
            },
            searchByHand() {
                if (this.searchKey !== '') {
                    console.log("哈哈哈14");
                    this.poiPicker.searchByKeyword(this.searchKey)
                }
            },
            addMarker() {
                this.transferMakers();
                console.log("点击了添加maker");
                console.log(JSON.stringify(this.markers));
                let marker = {
                    position: [115.84179 + (Math.random() - 0.5) * 0.02, 28.74188 + (Math.random() - 0.5) * 0.02],
                    events: {
                        click() {
                            console.log("hhh")
                            /*         self.windows.forEach(window => {
                                         window.visible = false;
                                     });*/
                            self.$nextTick(() => {
                                self.window.visible = true;
                            });
                        }
                    }
                };
                this.markers.push(marker);
                console.log(JSON.stringify(marker));
                console.log(JSON.stringify(this.markers));

            },
            removeMarker: function () {
                var aa = "115.851063,28.74263;115.850564,28.740812;115.85049,28.740547;115.85043,28.740252;115.850425,28.740234;" +
                    "115.850395,28.740048;115.85036,28.739826;115.850286,28.739271;115.850265,28.738707;115.850273,28.737873;115.850286,28.737465;" +
                    "115.850282,28.736992;115.850295,28.736406;115.850304,28.736293;115.850347,28.735859;115.850512,28.734475;115.850577,28.733984;115.850625,28.733659;" +
                    "115.850712,28.733021;115.850829,28.732444;115.850968,28.731766;115.851128,28.730972;115.851181,28.730599;115.851189,28.730178;115.851176,28.729896;115.851155,28.729696;" +
                    "115.851102,28.729392;115.85102,28.72895;115.850634,28.72753;115.850295,28.726276;115.849922,28.724878;115.849501,28.723229;115.84928,28.72227;115.848811,28.720187;" +
                    "115.848728,28.719648;115.84872,28.719466;115.848672,28.71888;115.848737,28.718529;115.848815,28.71826;115.848863,28.718116;115.848915,28.717995;115.849006,28.717826;" +
                    "115.849306,28.717374;115.849705,28.71681;115.849839,28.716628;115.851228,28.71474;115.851589,28.714284;115.851797,28.714063;115.852079,28.713785;115.852418,28.713503;" +
                    "115.85388,28.712274;115.854896,28.711411;115.85533,28.711037;115.855404,28.710981;115.857231,28.709436;115.858168,28.708659;115.858316,28.708537;115.859158,28.707799;" +
                    "115.859431,28.707535;115.859488,28.707483;115.859631,28.707339;115.859692,28.707274;115.859731,28.707231;115.860521,28.706445;115.861241,28.705716;115.861432,28.70553;" +
                    "115.86174,28.705191;115.861814,28.705117;115.862283,28.704657;115.862344,28.704592;115.86355,28.703364;115.865347,28.701523;115.865425,28.701441;115.865707,28.701146;" +
                    "115.867227,28.699735;115.868116,28.699041;115.868876,28.698459;115.868958,28.698394;115.869679,28.69786;115.870243,28.697478;115.87072,28.697183"
                let strings = aa.split(";", 81);
                console.log(strings)
                console.log(strings.length)
                var strs = new Array(); //定义一数组
                for (let i = 0; i < 40; i++) {
                    //console.log(strings[i])
                    let strings1 = strings[i].split(",");
                    console.log(strings1)
                   /* let position={
                        strings[i];
                    }*/
                  this.mark.position=strings1
                }
                // this.marker=
                /*if (!this.markers.length) return;
                this.markers.splice(this.markers.length - 1, 1);*/
            },

            picClick(position) {
                console.log("点击了图标事件")
                console.log(position)
            },
            transferMakers() {
                let markers = [];
                let windows = [];

                let num = 10;
                let self = this;

                for (let i = 0; i < num; i++) {
                    markers.push({
                        position: [115.84179, 28.74188+ i * 0.001],
                        events: {
                            click() {
                                console.log("点击");
                                self.windows.forEach(window => {
                                    window.visible = false;
                                });

                                self.window = self.windows[i];
                                self.$nextTick(() => {
                                    self.window.visible = true;
                                });
                            }
                        }
                    });

                    windows.push({
                        position: [115.84179, 28.74188+ i * 0.001],
                        content: `<div class="prompt">${i}</div>`,
                        visible: false
                    });
                }

                this.markers = markers;
                this.windows = windows;
            }
        },
        beforeMount() {
            let marker = {
                position: [315.84179 + (Math.random() - 0.5) * 0.02, 38.74188 + (Math.random() - 0.5) * 0.02]
            };
            this.markers.push(marker);
            console.log("滚滚滚");
            console.log(this.markers)

        }
    }
</script>

<style lang="css">
    .container {
        width: 100%;
        height: 100%;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        border: 1px solid #999;
    }

    .search-box {
        position: absolute;
        z-index: 5;
        width: 30%;
        left: 13%;
        top: 10px;
        height: 30px;
    }

    .search-box input {
        float: left;
        width: 80%;
        height: 100%;
        border: 1px solid #30ccc1;
        padding: 0 8px;
        outline: none;
    }

    .search-box button {
        float: left;
        width: 20%;
        height: 100%;
        background: #30ccc1;
        border: 1px solid #30ccc1;
        color: #fff;
        outline: none;
    }

    .tip-box {
        width: 100%;
        max-height: 260px;
        position: absolute;
        top: 30px;
        overflow-y: auto;
        background-color: #fff;
    }
</style>
