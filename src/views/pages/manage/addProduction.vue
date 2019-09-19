<template>
  <div class="add-production-page">
    <default-layout>
      <template #header>
        <p>添加产品</p>
      </template>
      <template #main>
        <el-form
          class="add-form"
          size="small"
          :model="addForm"
          ref="addForm"
          :rules="rules"
          label-width="150px"
        >
          <el-form-item
            label="名称"
            prop="name"
          >
            <el-input
              style="width:250px;"
              size="small"
              placeholder="请输入名称"
              :maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="封面"
            prop="coverCode"
          >
            <img-preview
              v-if="addForm.coverUrl"
              :imgLists="imgList"
            ></img-preview>
            <span
              v-if="addForm.coverUrl"
              style="cursor:pointer;color:#409EFF"
              @click="handleRemove"
            >重新上传</span>
            <el-upload
              v-else
              :http-request="toCoverUploader"
              :limit="1"
              :show-file-list="false"
            >
              <el-button
                size="small"
                type="primary"
              >点击上传</el-button>
              <!-- <div
                slot="tip"
                class="el-upload__tip"
              >只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
          <el-form-item
            label="视频资源"
            prop="files"
          >
            <my-video
              v-if="addForm.fileUrl !== ''"
              :videoSrc="addForm.fileUrl"
            ></my-video>
            <span
              v-if="addForm.fileUrl"
              style="cursor:pointer;color:#409EFF"
              @click="handleFileRemove"
            >重新上传</span>
            <el-upload
              v-else
              :http-request="toVideoUploader"
              :limit="1"
              :show-file-list="false"
            >
              <el-button
                size="small"
                type="primary"
              >点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item
            label="品牌型号"
            prop="type"
            :rules="[{required: true, message: '请选择', trigger: 'change'}]"
          >
            <el-cascader
              :options="options"
              v-model="addForm.type"
              filterable
              clearable
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.label }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </template>
            </el-cascader>
          </el-form-item>
          <el-form-item
            label="价格"
            prop="price"
          >
            <el-input-number
              v-model="addForm.price"
              :min="1"
              :precision="2"
              :controls="false"
              placeholder="请输入"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="热度"
            prop="hot_point"
          >
            <el-rate
              v-model="addForm.hot_point"
              allow-half
              style="margin-top:10px;"
            >
            </el-rate>
          </el-form-item>
          <el-form-item
            label="描述"
            prop="description"
          >
            <el-input
              v-model="addForm.description"
              style="width: 50%"
              type="textarea"
              :maxlength="300"
              :autosize="{minRows: 2}"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div class="footer-btns">
          <el-button type="primary">提交</el-button>
          <el-button
            type="default"
            @click="$router.go(-1)"
          >取消</el-button>
        </div>
      </template>
    </default-layout>
  </div>
</template>

<script type="text/ecmascript-6">
import DefaultLayout from '@/components/layout/DefaultDetailLayout'
import ImgPreview from '@/components/ImgPreview'
import { coverUpload, getSelectList } from '@/api/production'
import { uuid } from '@/utils/utils'
import { baseUrl } from '@/config/env'
import MyVideo from '../components/H5video'
export default {
    data () {
        return {
            options: [],
            addForm: {
                name: '',
                description: '',
                coverUrl: '',
                coverCode: '',
                type: [],
                hot_point: 0,
                price: 0,
                files: '',
                fileUrl: ''
            },
            imgList: []
        }
    },
    components: {
        DefaultLayout, ImgPreview, MyVideo
    },
    created () {

    },
    mounted () {
        this.getOpts()
    },
    methods: {
        async getOpts () {
            const res = await getSelectList()
            console.log('select', res)
            if (res.code === '00000') {
                this.options = res.data
            }
        },
        handleFileRemove () {
            this.addForm.fileUrl = ''
            this.addForm.files = ''
        },
        handleRemove () {
            this.addForm.coverUrl = ''
            this.addForm.coverCode = ''
            this.imgList = []
        },
        async toCoverUploader (params) {
            console.log(params)
            let file = params.file
            let formData = new FormData()
            formData.append('file', file)
            formData.append('uniqueIdentifier', this.$md5(uuid() + Date.parse(new Date())))
            const res = await coverUpload(formData)
            console.log(res, res.code === '00000')
            if (res.code === '00000') {
                this.addForm.coverUrl = baseUrl + res.data.url
                this.addForm.coverCode = res.data.code
                this.imgList.push(this.addForm.coverUrl)
                console.log(this.addForm, this.imgList)
            }
        },
        async toVideoUploader (params) {
            console.log(params)
            let file = params.file
            let formData = new FormData()
            formData.append('file', file)
            formData.append('uniqueIdentifier', this.$md5(uuid() + Date.parse(new Date())))
            const res = await coverUpload(formData)
            console.log(res, res.code === '00000')
            if (res.code === '00000') {
                this.addForm.fileUrl = baseUrl + res.data.url
                this.addForm.files = res.data.code
            }
        }
    }
}
</script>

<style scoped lang="scss">
.add-production-page {
  .add-form {
    width: calc(100% - 300px);
    margin: 0 auto;
  }
  .footer-btns {
    text-align: center;
  }
}
</style>
