import { unixToTime, timeToUnix, unixToDay } from './time'
// import { runStatusMaps } from '@/config/status'

export default {
    install (Vue, options) {
        Vue.prototype.formatFunc = (fnName = 'default', data = '', row = {}) => {
            const fnMap = {
                default: data => data,

                // 时间戳转换时间
                timeFormat: (data, row) => {
                    return unixToTime(data)[0]
                },
                // 时间戳转换时间
                timeFormatDate: (data, row) => {
                    return unixToDay(data)[0]
                },
                // 时间转时间戳
                formatTime: (data, row) => {
                    return timeToUnix(data)[0]
                },
                // 状态转标签
                // statusFormat: data => {
                //   return `<span class="status-tag ${runStatusMaps.type[data]}">${runStatusMaps.status[data]}</span>`
                // },
                // 时间戳转html
                unixToHtml: (data = '', row = {}) => {
                    return `<span title="${unixToTime(data)[0]}">${unixToTime(data)[0]}</span>`
                },
                // 数组转字符串
                arrToString: (data = [], row = {}) => {
                    if (data.length) return `<span title="${data.join('、')}">${data.join('、')}</span>`
                },
                // cpu测试评估
                levelFormat: (data, row) => {
                    return ` <div class="level-tip ${Math.ceil(data / 100) >= 7 ? 'higeLevel' : ''} ${Math.ceil(data / 100) === 0 ? 'lowLevel' : ''}">
            <div class="level-tip-item ${Math.ceil(data / 100) >= 1 ? 'active' : ''}"></div>
            <div class="level-tip-item ${Math.ceil(data / 100) >= 2 ? 'active' : ''}"></div>
            <div class="level-tip-item ${Math.ceil(data / 100) >= 3 ? 'active' : ''}"></div>
            <div class="level-tip-item ${Math.ceil(data / 100) >= 4 ? 'active' : ''}"></div>
            <div class="level-tip-item ${Math.ceil(data / 100) >= 5 ? 'active' : ''}"></div>
            <div class="level-tip-item ${Math.ceil(data / 100) >= 6 ? 'active' : ''}"></div>
            <div class="level-tip-item ${Math.ceil(data / 100) >= 7 ? 'active' : ''}"></div>
            <div class="level-tip-item ${Math.ceil(data / 100) >= 8 ? 'active' : ''}"></div>
            <div class="level-tip-item ${Math.ceil(data / 100) >= 9 ? 'active' : ''}"></div>
            <div class="level-tip-item ${Math.ceil(data / 100) >= 10 ? 'active' : ''}"></div>
          </div>`
                }
            }
            return fnMap[fnName](data, row)
        }
    }
}
