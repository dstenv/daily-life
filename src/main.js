import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import VantUIPlugin from './vantUi'
import WotDesign from 'wot-design'
import 'wot-design/lib/theme-default/index.css'
import BaiduMap  from "vue-baidu-map";


Vue.use(BaiduMap , { ak: 'zURguTOZUXr0IB8Fck90gvZDrEYG6U0w' });
Vue.use(VantUIPlugin)
Vue.use(WotDesign)


Vue.config.productionTip = false

Vue.axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
 
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
