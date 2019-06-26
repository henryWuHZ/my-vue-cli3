<template>
  <div class="file-download-component">
    <a v-if="downloadType === 'link'" :href="link" type="download">{{linkText}}</a>
    <span v-else-if="downloadType === 'blob'" class="download-file-btn" @click="toDownload">{{linkText}}</span>
  </div>
</template>

<script>
  export default {
    name: 'FileDownload',
    props: {
      downloadType: { type: String, default: 'link' },
      linkText: { type: String, default: '下载' },
      link: { type: String },
      downloadFunc: { type: Function },
      params: { type: Object },
      fileName: { type: String, default: 'downloadFile' }
    },
    data () {
    },
    components: {},
    created () {
    },
    methods: {
      async toDownload () {
        const blob = await this.downloadFunc({ ...this.params })
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, this.filename)
        } else {
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = this.fileName
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .file-download-component {
    .download-file-btn {
    }
  }
</style>
