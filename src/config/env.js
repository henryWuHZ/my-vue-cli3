let baseUrl = ''

const env = process.env
if (env.NODE_ENV === 'development') {
    baseUrl = `http://localhost:9000` // 开发环境地址
} else if (env.NODE_ENV === 'production') {
    baseUrl = `http://124.156.132.151:9000` // 生产环境地址
} else if (env.NODE_ENV === 'test') {
    baseUrl = `http://192.168.1.3` // 测试环境地址
}

export {
    baseUrl,
    env
}
