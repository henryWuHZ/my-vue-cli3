<template>
  <div class="welcome-page">
    <chunk-uploader
      targetUrl="http://127.0.0.1:9000/file/upload"
      :attrs="attrs"
      :headers="{}"
    ></chunk-uploader>
    <uploader
      :options="options"
      class="uploader-example"
    >
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop>
        <p>Drop files here to upload or</p>
        <uploader-btn>select files</uploader-btn>
        <uploader-btn :attrs="attrs">select images</uploader-btn>
        <uploader-btn :directory="true">select folder</uploader-btn>
      </uploader-drop>
      <uploader-list></uploader-list>
    </uploader>
  </div>
</template>

<script type="text/ecmascript-6">
import ChunkUploader from '@/components/ChunkUploader'
export default {
    data () {
        return {
            options: {
                // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
                target: '//localhost:9000/file/upload',
                testChunks: true
            },
            attrs: {
                accept: ['.jpg', '.zip', '.tar']
            }
        }
    },
    components: {
        ChunkUploader
    },
    created () {

    },
    mounted () {

    },
    methods: {

    }
}
</script>

<style scoped lang="scss">
.uploader-example {
  width: 880px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
