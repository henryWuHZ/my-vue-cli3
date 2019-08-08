<template>
  <div class="loading-select-component">
    <el-select
      v-model="value"
      :placeholder="placeholder"
      :size="size"
      filterable
      clearable
      v-el-select-loadmore="loadmore"
      @change="handleChange"
      :style="`width: ${width}px;`"
    >
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        placeholder: { type: String, default: '' },
        size: { type: String, default: 'medium' },
        getListFunc: { type: Function, required: true },
        params: { type: Object, default: () => { return {} } },
        pageSize: { type: Number, default: 10 },
        defaultActive: { type: Object, default: () => { return {} } },
        defaultValue: {}
    },
    data () {
        return {
            value: '',
            options: [],
            pageInfo: {
                page: 1,
                size: this.pageSize
            }
        }
    },
    model: {
        prop: 'defaultValue',
        event: 'handleChange'
    },
    components: {

    },
    directives: {
        'el-select-loadmore': {
            bind (el, binding) {
                const SELECT_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
                SELECT_DOM.addEventListener('scroll', function () {
                    const condition = this.scrollHeight - this.scrollTop <= this.clientHeight
                    if (condition) {
                        binding.value()
                    }
                })
            }
        }
    },
    watch: {
        defaultActive: function (val) {
            if (Object.keys(this.defaultActive).length) {
                let temp = []
                for (let i in this.options) {
                    if (this.options[i].value !== this.defaultActive.value) {
                        temp.push(this.options[i])
                    }
                }
                this.options = [...temp]
                this.options.unshift(this.defaultActive)
                this.value = this.defaultActive.value
            }
        }
    },
    created () {
        this.getSelectConfig()
    },
    mounted () {

    },
    methods: {
        handleChange () {
            this.$emit('handleChange', this.value)
        },
        loadMore () {
            this.pageInfo.page++
            this.getSelectConfig()
        },
        async getSelectConfig () {
            const res = await this.getListFunc({ ...this.params, ...this.pageInfo })
            if (res.code && res.code === '00000') {
                if (Object.keys(this.defaultActive).length) {
                    this.checkDefault(res.data)
                } else {
                    this.options = [...this.options, ...res.data]
                }
            }
        },
        checkDefault (arr) {
            let temp = []
            for (let i in arr) {
                if (arr[i].value !== this.defaultActive.value) {
                    temp.push(arr[i])
                }
            }
            this.options = [...this.options, ...temp]
        }
    }
}
</script>

<style scoped lang="scss">
</style>
