import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/custom'
//清楚默认样式
import './assets/css/reset.css'
//字体图标
import './assets/font/iconfont.css'
//图片格式化
import Tool from './assets/js/tool'
Vue.prototype.$Tool=Tool;
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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
