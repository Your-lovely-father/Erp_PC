import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//清楚默认样式
import './assets/css/reset.css'
//字体图标
import './assets/font/iconfont.css'
//rem 换算
// import '@/utils/flexable'
//Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//全局弹框
import {Message} from 'element-ui'
Vue.prototype.$message=Message;

//Vant
// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant);

// console.log(process.env.VUE_APP_BASEURL)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
