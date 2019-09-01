import CryptoJS from 'crypto-js'
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
// AES加解密
export const encrypt = (text) => {
    var key = CryptoJS.enc.Latin1.parse('1234567890654321') // 为了避免补位，直接用16位的秘钥
    var iv = CryptoJS.enc.Latin1.parse('1234567890123456') // 16位初始向量
    var encrypted = CryptoJS.AES.encrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    })
    return encrypted.toString()
}

export const decrypt = (text) => {
    var key = CryptoJS.enc.Latin1.parse('1234567890654321') // 为了避免补位，直接用16位的秘钥
    var iv = CryptoJS.enc.Latin1.parse('1234567890123456') // 16位初始向量
    var decrypted = CryptoJS.AES.decrypt(text, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    })
    return decrypted.toString()
}
