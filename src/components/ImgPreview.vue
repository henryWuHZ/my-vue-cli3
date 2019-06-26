<template>
  <div class="img-preview">
    <div v-if="showBtn" :class="btnClass" @click="showDetail(0)">{{btnText ? btnText : '点击查看'}}</div>
    <template v-else>
      <div
        v-for="(img, index) in imgLists"
        :key="index"
        class="small-list"
        @mouseenter="handlerHover(index)"
        @mouseleave="showInfo = false"
      >
        <img :src="img" @click="showDetail(index)" :style="`width: ${listImgSize}px; height: ${listImgSize}px;`">
        <div
          class="layer"
          v-show="showInfo && layerIndex === index"
          @click="showDetail(index)"
          :style="`width: ${listImgSize}px; height: ${listImgSize}px; line-height: ${listImgSize}px`"
        >点击查看大图
        </div>
      </div>
    </template>
    <div class="big-preview" v-if="showDialog" @click.prevent="handleClose">
      <div class="preview-layer"></div>
      <!--<i class="close el-icon-close" @click="handleClose"></i>-->
      <div class="preview-content">
        <div
          v-if="imgLists.length > 1"
          v-show="currentIndex !== '' && currentIndex >= 0"
          class="img-left"
          @click.stop="goLast"
        >
          <i class="el-icon-arrow-left"></i>
        </div>
        <div
          v-if="imgLists.length > 1"
          v-show="currentIndex !== '' && currentIndex >= 0"
          class="img-right"
          @click.stop="goNext"
        >
          <i class="el-icon-arrow-right"></i>
        </div>
        <img @click.stop="emptyHandle" :src="imgLists[currentIndex]">
      </div>
      <div v-if="imgLists.length > 1" class="point-index">
        <span
          v-for="(item, index) in imgLists"
          :key="index"
          class="normal"
          :class="{ actived: index === currentIndex }"
          @click.stop="showDetail(index)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ImgPreview',
    props: {
      imgLists: {
        type: Array,
        default: () => { return [] }
      },
      listImgSize: { type: Number, default: 100 },
      showBtn: { type: Boolean, default: false },
      btnText: { type: String, default: '' },
      btnClass: { type: String, default: '' }
    },
    data () {
      return {
        showDialog: false,
        currentIndex: 0,
        showInfo: false,
        layerIndex: 0
      }
    },
    components: {},
    created () {
    },
    methods: {
      goLast () {
        this.currentIndex > 0 && --this.currentIndex
      },
      goNext () {
        this.currentIndex < (this.imgLists.length - 1) && ++this.currentIndex
      },
      showDetail (index) {
        this.currentIndex = index
        this.showDialog = true
      },
      handleClose () {
        this.currentIndex = 0
        this.showDialog = false
      },
      handlerHover (index) {
        this.layerIndex = index
        this.showInfo = true
      },
      emptyHandle () {
        return
      }
    }
  }
</script>

<style lang="scss">
  .img-preview {
    overflow: hidden;
    .small-list {
      position: relative;
      margin-right: 20px;
      border-radius: 4px;
      overflow: hidden;
      float: left;
      img {
        // width: 100px;
        // height: 100px;
        vertical-align: top;
        cursor: pointer;
        border-radius: 4px;
      }
      .layer {
        // width: 100px;
        // height: 100px;
        // line-height: 100px;
        font-size: 12px;
        color: #ffffff;
        background: rgba(#000, 0.3);
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        // transform: translate(-50%, -50%);
        cursor: pointer;
        border-radius: 4px;
      }
    }
    .big-preview {
      position: fixed;
      width: calc(100vw);
      height: calc(100vh);
      top: 0;
      left: 0;
      z-index: 9999;
      .close {
        font-size: 30px;
        color: #ffffff !important;
        cursor: pointer;
        position: absolute;
        top: 5%;
        right: 5%;
        z-index: 99;
        &:hover {
          opacity: 0.4;
        }
      }
      .preview-layer {
        width: 100%;
        height: 100%;
        background: rgba(#000, 0.6);
      }
      .preview-content {
        width: 90%;
        height: 90%;
        // text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        img {
          max-width: 95%;
          max-height: 95%;
          border-radius: 4px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -52%);
        }
        .img-right {
          width: 30px;
          height: 60px;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 4px;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          color: #ffffff !important;
          &:hover {
            background: #000;
            opacity: 0.2;
          }
        }
        .img-left {
          width: 30px;
          height: 60px;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 4px;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          color: #ffffff !important;
          &:hover {
            background: #000;
            opacity: 0.2;
          }
        }
      }
      .point-index {
        width: 100%;
        height: 20px;
        text-align: center;
        position: absolute;
        bottom: 4%;
        z-index: 99;
        .normal {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 10px;
          background: #909199;
          cursor: pointer;
          & + .normal {
            margin-left: 18px;
          }
          &:hover {
            background: #f5f6fa;
          }
          &.actived {
            background: #1c92ff;
          }
        }
      }
    }
  }
</style>
