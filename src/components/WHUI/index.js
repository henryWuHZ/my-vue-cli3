import MyDrawer from './components/MyDrawer'
import MyCategoryMenu from './components/MyCategoryMenu'
import './assets/common.scss'
import './assets/loading.scss'

export default {
    install (Vue, opts) {
        Vue.component('MyDrawer', MyDrawer)
        Vue.component('MyCategoryMenu', MyCategoryMenu)
    }
}
