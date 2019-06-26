/**
* 版本号：v1.0
* 创建人：吴汉
* 创建时间：2019/01/10
* 描述：
btnText: 按钮标题,
successFlag: 接口正常状态码,
exprotFunc: 导出调用接口,
exprotParams: 导出接口传参,
title: 弹框标题,
showTitle: 是否显示弹框标题,
beforeClose: 弹框关闭前回调,
width: 弹框宽度,
height: 弹框高度,
showProgress: 是否显示进度条动画
*/
<template>
  <div class="chunk-upload">
    <uploader
      ref="chunkUpload"
      :options="options"
      :autoStart="autoStart"
      @file-added="toBeforeUpload"
      @file-success="onUploadSuccess"
      @file-progress="onUploadProcess"
      @file-error="onUploadError"
      class="uploader-app">
      <uploader-unsupport></uploader-unsupport>
      <uploader-btn class="default-btn light" style="width: 100px;height: 28px;border-radius: 4px"
                    :attrs="attrs" ref="uploadBtn"><i class="el-icon-upload2"
                                                      style="margin-right: 5px"></i>{{btnText}}
      </uploader-btn>
      <ul class="el-upload-list el-upload-list--text" v-if="fileList.length > 0">
        <li class="el-upload-list__item is-success" v-for="(item, index) in fileList" :key="index">
          <a class="el-upload-list__item-name">
            <i class="el-icon-document"></i>
            {{item.name}}
            <label class="el-upload-list__item-status-label">
              <i class="el-icon-upload-success el-icon-circle-check" style="color: #13ce66;"></i>
            </label>
            <i class="el-icon-close" @click="handFileListDelete(index)"
               style="color: #48576a;top: 2px"></i>
          </a>
        </li>
      </ul>
      <div style="font-size: 12px;color: #909199;margin-top: 12px">
        {{footInfo}}
      </div>
    </uploader>
  </div>
</template>

<script>
  export default {
    name: 'fileExport',
    props: {
      // options: {type: Object, required: true},
      btnText: { type: String, default: '上传文件' },
      footInfo: { type: String, default: '上传文件时请不要关闭当前页面，只可上传1个文件，上传格式为zip/tar/7z，文件最大10G' },
      autoStart: { type: Boolean, default: true },
      beforeUpload: Function,
      onSuccess: Function,
      onProgress: Function,
      onError: Function,
      headers: { type: Object },
      targetUrl: { type: String, required: true },
      chunkSize: { type: String, default: '1024 * 1024 * 32' },
      maxChunkRetries: { type: Number, default: 3 },
      simultaneousUploads: { type: Number, default: 1 }
    },
    data () {
      return {
        fileList: [],
        options: {
          target: this.targetUrl, // 目标上传 URL
          singleFile: true, // 单文件上传。覆盖式，如果选择了多个会把之前的取消掉
          chunkSize: this.chunkSize + '', // 分块大小
          fileParameterName: 'file', // 上传文件时文件的参数名，默认file
          maxChunkRetries: this.maxChunkRetries, // 最大自动失败重试上传次数
          testChunks: true, // 是否开启服务器分片校验
          simultaneousUploads: 1, // 并发上传数
          // 服务器分片校验函数，秒传及断点续传基础
          checkChunkUploadedByResponse: function (chunk, message) {
            let objMessage = JSON.parse(message)
            if (objMessage.skipUpload) {
              return true
            }

            return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
          },
          headers: {
            // 在header中添加的验证，请根据实际业务来
            ...this.headers
          }
        }
      }
    },
    components: {},
    created () {
    },
    methods: {
      handFileListDelete (index) {
        this.fileList.splice(index, 1)
        this.$refs['chunkUpload'].fileList.splice(index, 1)
        this.$refs['chunkUpload'].files.splice(index, 1)
        this.$emit('fileListDelete', index)
      },
      toBeforeUpload (file) {
        this.beforeUpload(file)
      },
      onUploadSuccess (rootFile, file, message) {
        this.onSuccess(rootFile, file, message)
      },
      onUploadProcess (rootFile, file, message) {
        this.onProgress(rootFile, file, message)
      },
      onUploadError (rootFile, file, message) {
        this.onError(rootFile, file, message)
      }
    }
  }
</script>

<style lang="scss">
  .chunk-upload {

  }
</style>
