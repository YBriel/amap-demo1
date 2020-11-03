<template>
    <div class="content">
        <div class="amap-wrapper">
            <el-amap class="amap-box" :zoom="zoom" :center="center" :mapStyle="mapStyle">
                <el-amap-marker
                        v-for="marker in markers"
                        :position="marker.position"
                        :key="marker.id"
                        :events="marker.events"
                        :icon="marker.icon"
                ></el-amap-marker>
                <el-amap-info-window
                        v-if="window"
                        :position="window.position"
                        :visible="window.visible"
                        :content="window.content"
                        :offset="window.offset"
                ></el-amap-info-window>
            </el-amap>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                center: [121.539693,31.126667],
                zoom:16,
                mapStyle: "amap://styles/8b6be8ec497009e17a708205348b899a", //设置地图样式
                markers: [],
                windows:[],
                window:'',
            }
        },
        methods:{
            point(){
                let markers = [];
                let windows=[];
                let that=this;
                let pointMarker=[
                    {
                        lng:121.536477,
                        lat:31.26924,
                        url:"../../assets/logo.png",
                        title:"this is title",
                        text: "aaaaa"
                    },{
                        lng:121.538097,
                        lat:31.126337 ,
                        url:"../../assets/logo.png",
                        title:"this is title",
                        text: "bbbbb"
                    }];
                pointMarker.forEach((item,index)=>{
                    markers.push({
                        position: [item.lng,item.lat],
                        // icon:item.url, //不设置默认蓝色水滴
                        events: {
                            click() {
                                that.windows.forEach(window => {
                                    window.visible = false; //关闭窗体
                                });
                                that.window = that.windows[index];
                                that.$nextTick(() => {
                                    that.window.visible = true;//点击点坐标，出现信息窗体
                                });
                            }
                        }
                    })
                    windows.push({
                        position: [item.lng,item.lat],
                        content:"<div>"+item.text+"</div>",//内容
                        offset:[5,-15],//窗体偏移
                        visible: false//初始是否显示
                    })
                });
                //  加点
                this.markers = markers;
                //加弹窗
                this.windows=windows
            },
        },
        mounted(){
            this.point()
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .amap-wrapper {
        width: 1440px;
        height: 600px;
    }
</style>
