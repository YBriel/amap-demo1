import Vue from 'vue';
import app from './App.vue';
import VueAMap from "vue-amap";
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import appTrack from './AppTrack.vue';
import appTrackBackup from './AppTrackBackup.vue';
import appTrackBackupDetail from './AppTrackBackupDetail.vue';
import appTrackStation from './AppTrackStation.vue';
import goodList from "./components/GoodList.vue"
import ok from "./AppOk"
import menu from "./MenuParse"
//import click from "./ClickEvent"
import app3 from "./App3"
import app2 from "./App2"
import temp from "./Temp"
import backup from "./AppBackup"
import mp4 from "./PlayMp4"
import vueMiniPlayer from 'vue-mini-player'
Vue.use(vueMiniPlayer)

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
    {path: '/appTrackBackup', component: appTrackBackup},
    {path: '/appTrackStation', component: appTrackStation},
    {path: '/goodList', component: goodList},
   // {path: '/click', component: click},
    {path: '/ok', component: ok},
    {path: '/app3', component: app3},
    {path: '/app2', component: app2},
    {path: '/temp', component: temp},
    {path: '/backup', component: backup},
    {path: '/mp4', component: mp4},
    {path: '/menu', component: menu},
    {path: '/appTrackBackupDetail', component: appTrackBackupDetail}

  ]

});
/*router.beforeEach((to, from, next) => {
});*/

router.beforeEach((to, from, next) => {
  console.log(to, from)
  next();
});

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

var vm=new Vue({
  el: '#app',
  // render:(h)=>{h(app)},
  render: h => h(app),
  router,
  // component:{
  //   app
  // }
});


