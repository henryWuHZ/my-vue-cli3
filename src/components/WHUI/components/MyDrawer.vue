<template>
  <div
    class="my-drawer"
    :style="`width:${visible? '100%': '0%'};`"
  >
    <div
      class="my-drawer-mask"
      :class="{'not-show': !visible}"
      @click="closeDrawer"
    ></div>
    <div
      class="my-drawer-content"
      :class="contentStyle"
      :style="`width:${width};height:${height};`"
    >
      <header class="drawer-title">{{title}}</header>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        visible: { type: Boolean, default: false },
        position: { type: String, default: 'bottom' },
        title: { type: String },
        width: { type: String, default: '100%' },
        height: { type: Number }
    },
    data () {
        return {

        }
    },
    computed: {
        contentStyle: function () {
            let temp = ''
            switch (this.position) {
            case 'top':
                if (this.visible) temp = 'content-top-no-transform'
                else temp = 'content-top'
                break
            case 'right':
                if (this.visible) temp = 'content-right-no-transform'
                else temp = 'content-right'
                break
            case 'bottom':
                if (this.visible) temp = 'content-bottom-no-transform'
                else temp = 'content-bottom'
                break
            case 'left':
                if (this.visible) temp = 'content-left-no-transform'
                else temp = 'content-left'
                break
            }
            return temp
        }
    },
    components: {

    },
    created () {

    },
    mounted () {

    },
    methods: {
        closeDrawer () {
            this.$emit('update:visible', false)
        }
    }
}
</script>

<style scoped lang="scss">
@keyframes antdDrawerFadeIn {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0.2;
  }
  60% {
    opacity: 0.4;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.6;
  }
}
.my-drawer {
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100%;
  top: 0;
  .my-drawer-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.6;
    animation: antdDrawerFadeIn 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  }
  .my-drawer-content {
    background: #ffffff;
    position: fixed;
    box-shadow: inset 0 -1px 0 0 #dcdee6;
    transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
      box-shadow 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
      -webkit-transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
      -webkit-box-shadow 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    .drawer-title {
      padding: 0 24px;
      text-align: left;
      box-sizing: border-box;
      font-size: 16px;
      color: #48494d;
      letter-spacing: 0;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #dcdee6;
    }
  }
  .content-top {
    top: 0;
    transform: translateY(-100%);
    width: 100%;
  }
  .content-right {
    height: 100%;
    right: 0;
    transform: translateX(100%);
  }
  .content-bottom {
    transform: translateY(100%);
    bottom: 0;
    width: 100%;
  }
  .content-left {
    height: 100%;
    left: 0;
    transform: translateX(-100%);
  }
  .content-top-no-transform {
    top: 0;
    width: 100%;
  }
  .content-right-no-transform {
    height: 100%;
    right: 0;
  }
  .content-bottom-no-transform {
    bottom: 0;
    width: 100%;
  }
  .content-left-no-transform {
    height: 100%;
    left: 0;
  }
}
.not-show {
  display: none;
}
</style>
