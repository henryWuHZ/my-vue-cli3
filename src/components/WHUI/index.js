import MyDrawer from './components/MyDrawer'
import MyCategoryMenu from './components/MyCategoryMenu'

export default {
    install (Vue, opts) {
        Vue.component('MyDrawer', MyDrawer)
        Vue.component('MyCategoryMenu', MyCategoryMenu)
    }
}
