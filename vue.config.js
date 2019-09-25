// const mockdata = require('./mock/login.json')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const PostCss2Vw = require('postcss-px-to-viewport')

const compress = new CompressionWebpackPlugin(
    {
        filename: info => {
            return `${info.path}.gz${info.query}`
        },
        algorithm: 'gzip',
        threshold: 10240,
        test: new RegExp(
            '\\.(' +
            ['js'].join('|') +
            ')$'
        ),
        minRatio: 0.8,
        deleteOriginalAssets: false
    }
)

// const postCss2Vw = new PostCss2Vw({
//     viewportWidth: 1366, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
//     viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
//     unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数
//     viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
//     selectorBlackList: ['.ignore'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
//     minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
//     mediaQuery: false // 允许在媒体查询中转换`px`
// })

module.exports = {
    devServer: {
        before (app) {
            // app.get('/signIn', (req, res, next) => {
            // res.json(mockdata)

            // })
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px-to-viewport')({
                        unitToConvert: 'px',
                        viewportWidth: 1280,
                        unitPrecision: 3,
                        propList: [
                            '*'
                        ],
                        viewportUnit: 'vw',
                        fontViewportUnit: 'vw',
                        selectorBlackList: [],
                        minPixelValue: 1,
                        mediaQuery: false,
                        replace: true
                    })
                ]
            }
        }
    },
    chainWebpack: config => {
        // 压缩代码
        config.optimization.minimize(true)
        // 分割代码
        config.optimization.splitChunks({
            chunks: 'all'
        })
        // 用cdn方式引入
        config.externals({
            'vue': 'Vue',
            'vuex': 'Vuex',
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT', // 需用MINT
            'axios': 'axios'
        })
    },
    configureWebpack: {
        plugins: [compress]
    }
}
