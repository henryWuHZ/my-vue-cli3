<template>
  <div class="img-show-page">
    <img-preview :imgLists="[testImg, testImg, testImg]"></img-preview>
    <el-tree
      :data="data2"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      :default-checked-keys="[10]"
      :props="defaultProps"
    >
    </el-tree>
    <div>
      <el-form
        ref="form"
        :model="form"
      >
        <el-form-item label="aaaa">
          <el-input v-model="form.aaa"></el-input>
        </el-form-item>
        <ports-form-item
          :form="form"
          :portKey="'ports'"
        ></ports-form-item>
      </el-form>
      <el-button
        type="primary"
        @click="showForm"
      >生成</el-button>
    </div>
  </div>
</template>

<script>
import ImgPreview from '@/components/ImgPreview'
import PortsFormItem from '@/components/PortsFormSet'

let testImg = require('@/static/login_bg.jpg')

export default {
    name: 'imgshow',
    data () {
        return {
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            data2: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],
            testImg: testImg,
            form: {
                aaa: '',
                ports: [
                    {
                        type: '',
                        port: ''
                    }
                ]
            }
        }
    },
    components: { ImgPreview, PortsFormItem },
    created () {
    },
    beforeDestroy () {
        let m = 0
        let a = setInterval(function (timer) {
            console.log(123, m++)
        }, 1000)
        console.log(a)
    },
    methods: {
        showForm () {
            let that = this
            this.$refs['form'].validate(function (valid) {
                if (valid) {
                    console.log(that.form, 'form')
                }
            })
        }
    }
}
</script>

<style lang="scss">
.img-show-page {
}
</style>
