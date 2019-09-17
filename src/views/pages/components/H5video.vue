// Ogg 文件，适用于Firefox、Opera 以及 Chrome 浏览器。
// 要确保适用于 Safari 浏览器，视频文件必须是 MPEG4 类型。
<template>
  <div class="h5-video">
    <video
      ref="myvideo"
      :src="videoSrc"
      :preload="preload?'preload': false"
      :autoplay="autoplay? 'autoplay':false"
      :poster="poster? poster: false"
      :width="width"
      :height="height"
      :controls="controls?'controls':false"
      :loop="loop?'loop': false"
      :controlsList="showDownload? 'download' : 'nodownload'"
    ></video>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        videoSrc: { type: String, required: true },
        preload: { type: Boolean, default: true },
        autoplay: { type: Boolean, default: false },
        poster: { type: String, default: '' },
        controls: { type: Boolean, default: true },
        loop: { type: Boolean, default: false },
        width: { type: String, default: '340' },
        height: { type: String, default: '200' },
        showDownload: { type: Boolean, default: false }
    },
    data () {
        return {

        }
    },
    components: {

    },
    created () {

    },
    mounted () {
        let video = this.$refs.myvideo
        console.log('video', this.$refs.myvideo, video.currentSrc)
    },
    methods: {

    }
}
</script>

<style scoped lang="scss">
</style>
