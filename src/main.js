import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/common.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import uploader from 'vue-simple-uploader'
import VueVideoPlayer from 'vue-video-player'
import WHUI from './components/WHUI'
import './assets/iconfont/iconfont.css'
import md5 from 'js-md5'
import tableFormat from '@/utils/tableFormat.js'

// require videojs style
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

Vue.use(VueVideoPlayer /* {
  options: global default options,
  events: global videojs events
} */)

Vue.config.productionTip = false
Vue.prototype.$md5 = md5
Vue.use(ElementUI).use(uploader).use(WHUI).use(tableFormat)

window.vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
