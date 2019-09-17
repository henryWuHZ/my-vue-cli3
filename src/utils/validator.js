/*
 *  注册模块
 */
import md5 from 'js-md5'
export const phoneValidator = (rule, value, callback) => {
  if (value === '') return callback()
  else {
    let re = /^[1][3,4,5,7,8][0-9]{9}$/
    re.test(value) ? callback() : callback(new Error('手机号格式有误'))
  }
}

export const imgCodePass = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('验证码不能为空'))
  }
  let re = /^[a-zA-Z0-9]{4}$/
  if (!re.test(value)) {
    callback(new Error('验证码错误'))
  } else {
    let correct = localStorage.getItem('c')
    md5(value.toLowerCase()) === correct ? callback() : callback(new Error('验证码错误'))
  }
}
// 手机号码校验(不校验空)
export const rehearsePhone = (rule, value, callback) => {
  if (!value) {
    return callback()
  }
  let re = /^(((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[6])|(17[0135678])|(18[0-9])|(19[89]))\d{8})$/
  re.test(value) ? callback() : callback(new Error('手机号格式有误'))
}
// 邮箱校验(不校验空)
export const rehearseEmail = (rule, value, callback) => {
  if (!value) {
    return callback()
  }
  let re = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  re.test(value) ? callback() : callback(new Error('邮箱格式有误'))
}
// 身份证号码校验（不校验空）
export const idCardNumberPassEmpty = (rule, value, callback) => {
  if (!value) {
    return callback()
  }
  value.length !== 18 || value[17] !== calc18Code(value) ? callback(new Error('身份证号格式有误')) : callback()
  function calc18Code (code) {
    let sum = 0
    const arr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const confirmCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    for (let i = 0; i < 17; i++) {
      sum += code[i] * 1 * arr[i]
    }
    return confirmCode[sum % 11]
  }
}
// 身份证号码校验
export const idCardNumberPass = (rule, value, callback) => {
  value.length !== 18 || value[17] !== calc18Code(value) ? callback(new Error('身份证号格式有误')) : callback()
  function calc18Code (code) {
    let sum = 0
    const arr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const confirmCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    for (let i = 0; i < 17; i++) {
      sum += code[i] * 1 * arr[i]
    }
    return confirmCode[sum % 11]
  }
}
// 密码校验（不校验空）
export const passwordEmpty = (rule, value, callback) => {
  if (!value) {
    return callback()
  }
  if (value.length < 6 || value.length > 20) {
    return callback(new Error('密码长度不得小于6位'))
  }
  let number = /\d/
  let letter = /[a-zA-Z]/
  let str = /[!@#$%^&*.+-]/
  if (number.test(value) && letter.test(value) && str.test(value)) callback()
  else callback(new Error('6-20位，须含字母、数字、符号'))
}
// 密码校验
export const rehearsePassword = (rule, value, callback) => {
  if (value.length < 6 || value.length > 20) {
    return callback(new Error('密码长度不得小于6位'))
  }
  let number = /\d/
  let letter = /[a-zA-Z]/
  let str = /[!@#$%^&*.+-]/
  if (number.test(value) && letter.test(value) && str.test(value)) callback()
  else callback(new Error('6-20位，须含字母、数字、符号'))
}
// 演练管理密码校验
export const urlValidator = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('url不能为空'))
  }
  let re = /[http|ftp|https]:\/\//
  if (re.test(value)) callback()
  else callback(new Error('url格式有误'))
}

// 重置密码密码设置
export const passwordValidator = (rule, value, callback) => {
  if (value.length < 6 || value.length > 20) {
    return callback(new Error('密码长度不得小于6位'))
  }
  let number = /\d/
  let letter = /[a-zA-Z]/
  let str = /[!@#$%^&*.+-]/
  if (number.test(value) && letter.test(value) && str.test(value)) callback()
  else callback(new Error('6位或6位以上，须含字母、数字、符号'))
}
// 版本编号校验
export const versionCodeValidator = (rule, value, callback) => {
  if (!value) return callback(new Error('版本编号不能为空'))
  let str = /[!@#$%^&*.+-,;]/
  if (!str.test(value)) callback()
  else callback(new Error('版本编号不能包含特殊符号'))
}
