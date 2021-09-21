import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'

// 导入全局样式表
import './assets/css/global.css'

import TreeTable from 'vue-table-with-tree-grid'

/**
 * 导入富文本编辑器
 */
import VueQuillEditor from 'vue-quill-editor'

/**
 * 导入富文本编辑器对应的样式
 */
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

/**
 * 导入 NProgress 包对应的 js 和 css
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 在request 拦截器中 展示进度条 NProgress.start()


// 设置axios 拦截器
axios.interceptors.request.use(config => {
  // console.log(config)
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后比 return config
  return config
})

// 在 respons 拦截器中 隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

/**
 * 全局注册富文本编辑器 注册为全局可用组件
 */
Vue.use(VueQuillEditor)

/**
 * 格式化时间过滤器
 */
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  /**
   * 年
   * 月
   * 日
   */
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  /**
   * 时
   * 分
   * 秒
   */
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  /**
   * 拼接成完整日期字符串
   */

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
