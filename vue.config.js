const mockdata = require('./mock/login.json')

module.exports = {
    devServer: {
        before (app) {
            app.get('/signIn', (req, res, next) => {
                res.json(mockdata)
            })
        }
    }
}
