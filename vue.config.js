// const mockdata = require('./mock/login.json')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

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
        plugins: [compress],
        output: {
            // 输出重构
            filename: `[name].${Date.now()}.js`,
            chunkFilename: `[name].${Date.now()}.js`
        }
    }
}
