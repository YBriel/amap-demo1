import Vue from 'vue';
import App from './App.vue';
import VueAMap from "vue-amap";
import VueRouter from 'vue-router'


import AppTrack from "@/AppTrack";


Vue.config.productionTip = false;
//main.js引入
Vue.use(VueAMap);
Vue.use(VueRouter);
VueAMap.initAMapApiLoader({
  key: 'd6a13046ccbbe124fda43844ffd7f21f', //, 'AMap.Geolocation'
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4',
  uiVersion: '1.0.11' // 版本号
});


var router=new VueRouter({
  routers: [
    //account goodslist
    {path: '/track',component:AppTrack},
  ]

});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
