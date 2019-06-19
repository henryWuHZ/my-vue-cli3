import axios from 'axios'
import Qs from 'qs'

let baseUrl = process.env.NODE_ENV !== 'production' ? '/' : '/'
const instance = axios.create({
    baseURL: baseUrl,
    timeout: 20000,
    headers: {
        Accept: 'application/json'
    }
})

// http request 拦截器
instance.interceptors.request.use(
    config => {
        if (localStorage.token) {
            config.headers.authorization = localStorage.token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// http response 拦截器
instance.interceptors.response.use(
    response => {
        if (response.headers.hasOwnProperty('date')) localStorage.setItem('currentDate', Date.parse(new Date(response.headers.date)))
        if (response.headers.authorization) {
            localStorage.token = response.headers.authorization
        }
        handleData(response.data)
        return response.data
    },
    error => {
        if (error.response) {
            console.log(error.response.status)
        }
        return Promise.reject(error.response.data)
    }
)

// 处理数据
function handleData (data) {}

// 二次封装方法
const getFn = (url, data, config = {}) => {
    let params = { params: data, ...config }
    return instance.get(url, params).catch(handleError)
}

const postFn = (url, data, config = {}) => {
    return instance.post(url, data, config).catch(handleError)
}

const deleteFn = (url, data) => {
    return instance.delete(url, data).catch(handleError)
}

const postJSON = (url, data) => {
    data = Qs.stringify(data)
    return instance.post(url, data).catch(handleError)
}

const patchFn = (url, data) => {
    return instance.patch(url, data).catch(handleError)
}
// 捕获请求错误
function handleError (error) {
    Promise.reject(error)
}

export default {
    postJSON: postJSON,
    post: postFn,
    get: getFn,
    delete: deleteFn,
    patch: patchFn
}
