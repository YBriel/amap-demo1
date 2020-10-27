<template>
    <div class="amp-demo">
        <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo" v-if="reFresh">
            <!-- 点坐标  -->
            <el-amap-marker :position="marker.position" :visible="marker.visible" :draggable="marker.draggable" vid="index" ></el-amap-marker>
            <el-amap-marker :position="marker2.position" :visible="marker2.visible" :draggable="marker2.draggable" vid="index2"></el-amap-marker>
            <!-- 标记文本 -->
            <el-amap-text v-for="(text,index) in texts" :key="index" :text="text.text" :offset="text.offset" :position="text.position" :events="text.events"></el-amap-text>
            <!-- 折线路径 -->
            <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" ></el-amap-polyline>
        </el-amap>
    </div>
</template>


<script>
    export default {
        name: 'demo',
        data() {
            return {
                reFresh:true,
                slotStyle: {
                    padding: '2px 8px',
                    background: '#eee',
                    color: '#333',
                    border: '1px solid #aaa'
                },
                zoom: 12,
                center: [121.5273285, 31.25515044],
                polyline: {
                    path: [[121.5389385, 31.21515044], [121.5273285, 31.21515044]],
                    editable: false
                },
                marker: {
                    position: [121.5273285, 31.21515044],
                    visible: true,
                    draggable: false,
                    content:'2',
                    template: '<span>2</span>',
                },
                marker2: {
                    position: [121.5273285, 31.21515044],
                    visible: true,
                    draggable: false,
                    content:'1',
                    template: '<span>1</span>',
                },
                texts: [
                    {
                        position: [121.5273285, 31.21515044],
                        text: '收货地',
                        offset: [0, -70],
                    },
                    {
                        position: [121.5273285, 31.21515044],
                        text: '发货地',
                        offset: [0, -70],
                    },
                ],
            }
        },
        methods: {
            menuTree(){
                this.reFresh= false
                this.$nextTick(()=>{
                    this.reFresh = true
                })
            },
        }
    };

</script>
