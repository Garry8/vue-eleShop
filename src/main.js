import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入全局样式表
import './assets/css/globe.css'

// 引入用到的阿里图标
import './assets/aliicon/font_lizi/iconfont.js'
import './assets/aliicon/font_ren/iconfont.js'

// 导入axios
import axios from 'axios'
Vue.prototype.$http = axios
// 填写根路径
// axios.defaults.baseURL = ''
Object.defineProperty(Vue.prototype, '$http', {
    value: axios
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
