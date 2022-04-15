import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI, { Message ,confirm} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'
axios.defaults.baseURL = 'http://175.27.228.178:3434/api/private/v1/'
axios.interceptors.request.use(config => {
  // 为请求头对象，添加Token验证Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须return config
  return config
})
Vue.prototype.$http = axios

Vue.use(ElementUI);
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
