export const uuid =
  () => {
      return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4)
  }
// 延迟wait后执行
export const debounce = function (func, wait) {
    let timer
    return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(func, wait)
    }
}
