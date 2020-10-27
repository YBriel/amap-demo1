import Vue from 'vue';
import App from './App.vue';
import VueAMap from "vue-amap";

Vue.config.productionTip = false;
//main.js引入
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'd6a13046ccbbe124fda43844ffd7f21f',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
});

new Vue({
  render: h => h(App),
}).$mount('#app')
