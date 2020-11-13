import Vue from 'vue';
import app from './App.vue';
import VueAMap from "vue-amap";
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import appTrack from './AppTrack.vue';
import goodList from '../src/components/GoodList.vue'


Vue.config.productionTip = false;
//main.js引入
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: 'd6a13046ccbbe124fda43844ffd7f21f', //, 'AMap.Geolocation'
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4',
  uiVersion: '1.0.11' // 版本号
});


const router = new VueRouter({
  routers: [
    //account goodslist
    {path:'',redirect:"goodList"},
    {path: '/track', component: appTrack},
    {path: '/goodList', component: goodList},

  ]

});

var vm=new Vue({
  el: '#app',
  render: h => h(app),
  router
});
