import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI, { Message, confirm } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//导入富文本编辑器
import  VueQuillEditor  from 'vue-quill-editor' 
//require styles 导入对应样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'



import TreeTable from 'vue-table-with-tree-grid'

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

//注册为全局可用的组件
Vue.component('tree-table', TreeTable)

//将富文本编辑器 注册为全局可用组件
Vue.use(VueQuillEditor)

//创建过滤器将秒数过滤为年月日，时分秒
Vue.filter('dateFormat',function(originVal){
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth()+1+'').padStart(2,'0')
  const d = (dt.getDate()+'').padStart(2,'0')

  const hh = (dt.getHours()+'').padStart(2,'0')
  const mm = (dt.getMinutes()+'').padStart(2,'0')
  const ss = (dt.getSeconds()+'').padStart(2,'0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
