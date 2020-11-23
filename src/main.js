import Vue from 'vue';
import app from './App.vue';
import VueAMap from "vue-amap";
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import appTrack from './AppTrack.vue';
import goodList from "./components/GoodList.vue"
import ok from "./AppOk"
//import click from "./ClickEvent"
import app3 from "./App3"
import app2 from "./App2"
import temp from "./Temp"
import backup from "./AppBackup"


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
  routes: [
    //account goodslist
    // {path:'',redirect:"goodList"},
    {path: '/track', component: appTrack},
    {path: '/goodList', component: goodList},
   // {path: '/click', component: click},
    {path: '/ok', component: ok},
    {path: '/app3', component: app3},
    {path: '/app2', component: app2},
    {path: '/temp', component: temp},
    {path: '/backup', component: backup},

  ]

});
/*router.beforeEach((to, from, next) => {
});*/

router.beforeEach((to, from, next) => {
  console.log(to, from)
  next();
});
var vm=new Vue({
  el: '#app',
  // render:(h)=>{h(app)},
  render: h => h(app),
  router,
  // component:{
  //   app
  // }
});


