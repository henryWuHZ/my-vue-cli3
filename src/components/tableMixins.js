// 表格方法的mixins
export default {
    data () {
        return {
            // 表格数据，具体参考接口数据
            tables: {
                thead: [],
                tbody: [],
                // 翻页配置
                pageInfo: {
                    page: 1,
                    size: 10,
                    total: 0
                },
                isMulti: false
            },
            // 表格是否处于loading状态
            loading: true,
            // 多选，已选中的id
            selection: [],
            // 查询条件，包括排序、搜索以及筛选
            searchCondition: {},
            userInfo: {}
        }
    },
    created () {
        if (this.$route.query.page) this.tables.pageInfo.page = this.$route.query.page
    },
    mounted () { },
    methods: {
        multiSet (val) {
            if (!this.selection.hasOwnProperty('id') || this.selection.id.length === 0) {
                return
            }
            this.apiStatus = val
            this.baseinfo = this.selection
        },
        // 多选事件, 返回选中的行及每行的当前状态
        selectionChange (value) {
            this.selection = value
        },
        afterListSet (res) {
            this.loading = false

            if (res.data.thead) {
                this.tables.thead = JSON.parse(JSON.stringify(res.data.thead))
            }
            this.tables.tbody = res.data.tbody
            if (res.data.pageInfo) {
                this.tables.pageInfo = JSON.parse(JSON.stringify(res.data.pageInfo))
            }
            res.data.hasOwnProperty('isMulti') && (this.tables.isMulti = res.data.isMulti)

            let query = JSON.parse(JSON.stringify(this.$route.query))
            this.$router.replace({
                query: Object.assign(query, { page: this.tables.pageInfo.page })
            })
        },
        // 设置操作项
        setOperation (res) {
            let that = this
            let tdata = JSON.parse(JSON.stringify(res))
            if (that.operateConfig && that.operateConfig.optFunc) {
                for (let i in tdata.data.tbody) {
                    let temp = that.operateConfig.optFunc(tdata.data.tbody[i], that.userInfo)
                    let operation = []
                    for (let j in temp) {
                        operation.push(that.operateConfig.optType[temp[j]])
                    }
                    that.$set(tdata.data.tbody[i], 'operation', operation)
                }
            }
            return tdata
        }
    }
}
