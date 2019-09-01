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
      @file-added="toBeforeUpload"
      @file-success="onUploadSuccess"
      class="uploader-app"
    >
      <uploader-unsupport></uploader-unsupport>
      <uploader-btn
        v-if="type === 'btn'"
        class="default-btn light"
        :attrs="attrs"
        ref="uploadBtn"
      ><i
          class="el-icon-upload2"
          style="margin-right: 5px"
        ></i>{{btnText}}
      </uploader-btn>
      <uploader-drop
        v-else-if="type === 'drop'"
        class="my-drop-area"
      >
        <uploader-btn class="drop-btn">
          <div>
            <i class="el-icon-upload"></i>
          </div>
          <div>
            <p style="font-size:16px;color: #5a5b5f;line-height: 24px;">点击或将文件拖拽到这里上传</p>
          </div>
        </uploader-btn>
      </uploader-drop>
      <ul
        class="el-upload-list el-upload-list--text"
        v-if="fileList.length > 0"
      >
        <li
          class="el-upload-list__item is-success"
          v-for="(item, index) in fileList"
          :key="index"
        >
          <a class="el-upload-list__item-name">
            <i class="el-icon-document"></i>
            {{item.name}}
            <label class="el-upload-list__item-status-label">
              <i
                class="el-icon-upload-success el-icon-circle-check"
                style="color: #13ce66;"
              ></i>
            </label>
            <i
              class="el-icon-close"
              @click="handFileListDelete(index)"
              style="color: #48576a;top: 2px"
            ></i>
          </a>
        </li>
      </ul>
      <div style="font-size: 12px;color: #909199;line-height:20px;">
        {{footInfo}}
      </div>
    </uploader>
  </div>
</template>

<script>
import { uuid } from '@/utils/utils'
export default {
    name: 'fileExport',
    props: {
        type: { type: String, default: 'btn' },
        btnText: { type: String, default: '上传文件' },
        footInfo: { type: String, default: '上传文件时请不要关闭当前页面，只可上传1个文件' },
        autoStart: { type: Boolean, default: true },
        beforeUpload: Function,
        onSuccess: Function,
        onProgress: Function,
        onError: Function,
        headers: { type: Object },
        attrs: { type: Object, default: () => { return {} } },
        targetUrl: { type: String, required: true },
        chunkSize: { type: Number, default: 1024 * 30 },
        maxSize: { type: Number, default: 1024 * 1024 * 1024 * 50 },
        outOfSizeInfo: { type: String, default: '文件大小超过上限' },
        maxChunkRetries: { type: Number, default: 3 },
        simultaneousUploads: { type: Number, default: 1 },
        defaultFileList: { type: Array, default: () => { return [] } }
    },
    data () {
        return {
            haveUpload: false,
            process: 0,
            fileList: [],
            options: {
                target: this.targetUrl, // 目标上传 URL
                singleFile: true, // 单文件上传。覆盖式，如果选择了多个会把之前的取消掉
                chunkSize: parseInt(this.chunkSize), // 分块大小
                fileParameterName: 'file', // 上传文件时文件的参数名，默认file
                maxChunkRetries: this.maxChunkRetries, // 最大自动失败重试上传次数
                testChunks: true, // 是否开启服务器分片校验
                simultaneousUploads: this.simultaneousUploads, // 并发上传数
                // 服务器分片校验函数，秒传及断点续传基础
                checkChunkUploadedByResponse: function (chunk, message) {
                    console.log('message', message)
                    let objMessage = JSON.parse(message)
                    if (objMessage.skipUpload) {
                        return true
                    }

                    return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
                },
                processResponse: function (response, cb) {
                    console.log('res', response)
                    let res = JSON.parse(response)
                    if (res.token) {
                        localStorage.jwtToken = res.token
                        this.headers = { ...this.headers, authorization: localStorage.jwtToken }
                    }
                    cb(null, response)
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
    watch: {
        defaultFileList: {
            handler (newValue, oldValue) {
                this.fileList = newValue
            },
            deep: true
        }
    },
    methods: {
        handFileListDelete (index) {
            this.fileList.splice(index, 1)
            this.$refs['chunkUpload'].fileList.splice(index, 1)
            this.$refs['chunkUpload'].files.splice(index, 1)
            this.$emit('fileListDelete', index)
        },
        toBeforeUpload (file) {
            this.haveUpload = true
            const outLimitSize = file.size > this.maxSize
            if (outLimitSize) {
                this.$message({
                    type: 'danger',
                    message: this.outOfSizeInfo
                })
                this.haveUpload = false
                file.ignored = true
            }
            this.process = 0
            file.uniqueIdentifier = this.$md5(uuid() + Date.parse(new Date()))
            this.beforeUpload && this.beforeUpload(file)
            console.log('file.uniqueIdentifier', file.uniqueIdentifier)
        },
        onUploadSuccess (rootFile, file, message) {
            const res = JSON.parse(message)
            this.haveUpload = false
            console.log('done', message)
            if (res.code === '00000') {
                this.$message({
                    type: 'success',
                    message: res.message
                })
                this.fileList = [{ name: file.name, code: res.data.code }]
                this.$emit('uploadSuccess', res)
            }
            this.onSuccess && this.onSuccess(rootFile, file, message)
        },
        onUploadProcess (rootFile, file, message) {
            if (message.processsedState) {
                const res = JSON.parse(message.processsedState.res)
                if (res.data.process) this.process = res.data.process
            }
            this.onProgress && this.onProgress(rootFile, file, message)
        },
        onUploadError (rootFile, file, message) {
            const res = JSON.parse(message)
            this.$message({
                type: 'danger',
                message: res.message
            })
            this.haveUpload = false
            this.onError && this.onError(rootFile, file, message)
        }
    }
}
</script>

<style lang="scss">
.chunk-upload {
  min-height: 76px;
  padding: 10px;
  box-sizing: border-box;
  .my-drop-area {
    width: 360px;
    height: 180px;
    box-sizing: border-box;
    padding: 30px;
    background-color: #fafbfc;
    border: 1px dashed #dcdee6;
    text-align: center;
    .drop-btn {
      padding: 0;
      border: 0;
      width: 100%;
      height: 100%;
      &:hover {
        background-color: #fafbfc;
      }
    }
  }
  .el-loading-mask {
    opacity: 0.4;
    background: #000000;
    .el-loading-spinner {
      margin-top: -36px;
      .circular {
        height: 32px;
        width: 32px;
      }
    }
    .el-loading-text {
      white-space: pre;
      color: #ffffff;
      line-height: 14px;
      margin: 0;
    }
  }
}
</style>
