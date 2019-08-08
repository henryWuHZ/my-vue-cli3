<template>
  <div class="page">
    <video-player
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      customEventName="customstatechangedeventname"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @statechanged="playerStateChanged($event)"
      @ready="playerReadied"
    >
    </video-player>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {
            playerOptions: {
                // videojs options
                muted: true,
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [{
                    type: 'video/mp4',
                    src: '/static/info.mp4'
                }],
                poster: '/static/logo.jpg'
            }
        }
    },
    components: {

    },
    computed: {
        player () {
            return this.$refs.videoPlayer.player
        }
    },
    created () {

    },
    mounted () {

    },
    methods: {
        // listen event
        onPlayerPlay (player) {
        // console.log('player play!', player)
        },
        onPlayerCanplaythrough (player) {
        // console.log('player play!', player)
        },
        onPlayerPause (player) {
        // console.log('player pause!', player)
        },
        onPlayerCanplay (player) {
        // console.log('player pause!', player)
        },
        // ...player event
        onPlayerWaiting (player) {
        // console.log('player pause!', player)
        },
        onPlayerPlaying (player) {
        // console.log('player pause!', player)
        },
        onPlayerLoadeddata (player) {
        // console.log('player pause!', player)
        },
        // or listen state event
        playerStateChanged (playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
        },
        onPlayerEnded (player) {
        // console.log('player play!', player)
        },
        // player is ready
        playerReadied (player) {
            console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
        }
    }
}
</script>

<style scoped lang="scss">
</style>
