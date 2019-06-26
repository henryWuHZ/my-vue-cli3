<template>
  <div class="img-show-page">
    <img-preview :imgLists="[testImg, testImg, testImg]"></img-preview>
    <div>
      <el-form ref="form" :model="form">
        <el-form-item label="aaaa">
          <el-input v-model="form.aaa"></el-input>
        </el-form-item>
        <ports-form-item :form="form" :portKey="'ports'"></ports-form-item>
      </el-form>
      <el-button type="primary" @click="showForm">生成</el-button>
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
