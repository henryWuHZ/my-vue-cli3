<template>
  <div class="entrances-page">
    <el-container>
      <el-header>
        <div style="float:left;display:flex;align-items: center;">
          <img
            class="company-logo"
            :src="defaultLogo"
            @click="$router.push('/welcome')"
          />
          <span style="float: left;">克拉汽车改装2</span>
        </div>
      </el-header>
      <el-main>
        <div class="left-part">
          <div class="search-input">
            <el-input
              v-model="searchKey"
              placeholder="搜索关键字"
              @keyup.enter.native="handleSearch"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                type="primary"
              ></el-button>
            </el-input>
          </div>
          <my-category-menu class="category-menu"></my-category-menu>
        </div>
        <div
          class="right-part"
          ref="right-part"
        >
          <el-carousel
            :interval="2000"
            type="card"
          >
            <el-carousel-item
              v-for="item in 6"
              :key="item"
            >
              <h3 class="medium">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
          <div style="position:relative;">
            <el-tabs
              v-model="activeName"
              @tab-click="handleClick"
            >
              <el-tab-pane
                label="最新上架"
                name="latest"
              ></el-tab-pane>
              <el-tab-pane
                label="火爆商品"
                name="hot"
              ></el-tab-pane>
            </el-tabs>
            <span class="show-all-production">查看全部<i class="el-icon-arrow-right"></i></span>
          </div>
          <div class="card-list">
            <card-layout
              class="car-card"
              :width="cardWidth"
            >
              <div
                slot="content"
                class="card-content"
              >
                <div
                  class="hover-zoom logo-img"
                  :style="`background-image: url(${test1})`"
                ></div>
                <div class="card-content-info">
                  <div class="item">
                    <div class="label">名称：</div>
                    <p>ddddddddddas</p>
                  </div>
                  <div class="item">
                    <div class="label">型号：</div>
                    <p>ddddddddddas</p>
                  </div>
                  <div class="item">
                    <div class="label">描述：</div>
                    <p>ddddddddddddddddasddddddddddddddddddddddasddddddddddasddddddddddasddddasddddasddddddddddasddddas</p>
                  </div>
                  <div class="item">
                    <div class="label">热度：</div>
                    <div>
                      <el-rate
                        v-model="value"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}"
                      >
                      </el-rate>
                    </div>
                  </div>
                </div>
                <div
                  class="footer"
                  style="text-align:right"
                  @click="toShowDetail"
                >
                  <i class="iconfont iconyuanfuceng_qianwanggoumai"></i>
                </div>
              </div>
            </card-layout>
          </div>
        </div>
      </el-main>
    </el-container>
    <transition name="scroll-fade">
      <div
        v-if="isScroll"
        class="scroll-top"
        @click="handleToTop"
      >
        <i class="iconfont iconhuojian"></i>
      </div>
    </transition>
    <my-drawer
      :visible.sync="showDrawer"
      position="right"
      title="title"
      width="256px;"
    >
      <div
        style="height:256px;"
        slot="content"
      >
        <p>bottom</p>
      </div>
    </my-drawer>
  </div>
</template>

<script>
import CardLayout from '@/components/CardLayout'
import { getSelectList } from '@/api/production'
let defaultLogo = require('../static/logo.jpg')
let test1 = require('../static/info1.jpg')
let test2 = require('../static/info2.jpg')

export default {
    name: 'entrances',
    data () {
        return {
            options: [],
            value: 3.7,
            showDrawer: false,
            activeIndex: '',
            activeName: 'latest',
            searchKey: '',
            defaultLogo: defaultLogo,
            test1: test1,
            test2: test2,
            isScroll: false,
            cardWidth: 0,
            cardHeight: 0
        }
    },
    components: { CardLayout },
    computed: {
    },
    watch: {
        cardWidth: function () {
            console.log(this.cardWidth, 123)
        }
    },
    created () {
    },
    mounted () {
        let that = this
        that.cardWidth = (this.$refs['right-part'].clientWidth - 60) / 3
        window.addEventListener('scroll', this.handleScroll, true)
        window.onresize = function () {
            that.cardWidth = (that.$refs['right-part'].clientWidth - 60) / 3
        }
    },
    methods: {
        async getOpts () {
            const res = await getSelectList()
            console.log('select', res)
            if (res.code === '00000') {
                this.options = res.data
            }
        },
        toShowDetail () {
            console.log(213)
            this.showDrawer = true
        },
        handleScroll () {
            this.isScroll = document.documentElement.scrollTop > 0
        },
        handleToTop () {
            document.documentElement.scrollTop = 0
        },
        handleClick (val) {},
        handleSelect (val) {},
        setLunBo (originArr, showNum) {
            let temp = originArr.splice(0, showNum)
            originArr = originArr.concat(temp)
            return originArr
        }
    }
}
</script>

<style lang="scss">
.entrances-page {
  .card-list {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .car-card {
      float: left;
      margin-bottom: 20px;
      min-width: 220px;
    }
  }
  .el-carousel__button {
    height: 4px;
    border-radius: 2px;
  }
  .el-header {
    position: fixed;
    width: 100%;
    z-index: 999;
    height: 60px !important;
    line-height: 60px;
    background-image: linear-gradient(
      -90deg,
      #282e40 0%,
      #38435c 52%,
      #282f40 100%
    );
    color: #ffffff;
    font-size: 16px;
    .company-logo {
      width: 40px;
      height: 40px;
      border-radius: 2px;
      float: left;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .el-main {
    margin-top: 60px;
  }
  .left-part {
    width: 30%;
    float: left;
    .search-input {
      margin-bottom: 20px;
    }
    .category-menu {
      position: absolute;
      z-index: 99;
      .right-menu {
        max-width: 500px;
      }
    }
  }
  .right-part {
    float: left;
    width: calc(70% - 24px);
    margin-left: 24px;
    .el-carousel__container {
      height: 300px;
    }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
    .show-all-production {
      position: absolute;
      right: 0;
      top: 8px;
      font-size: 14px;
    }
  }
  .scroll-top {
    position: fixed;
    right: 0;
    bottom: 60px;
    font-size: 54px;
    cursor: pointer;
    &:hover {
      color: #1c92ff;
    }
    i {
      font-size: 54px;
    }
  }
  .scroll-fade-enter-active {
    transition: all 0.3s ease;
  }
  .scroll-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .scroll-fade-enter, .scroll-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(10px);
    opacity: 0;
  }
  .card-content {
    padding: 10px;
    .logo-img {
      width: 100%;
      height: 150px;
      border-radius: 4px;
    }
  }
  .card-content-info {
    margin-top: 170px;
    .item {
      display: flex;
      margin-bottom: 10px;
      .label {
        word-break: keep-all;
        text-align: left;
        color: #48494d;
        font-size: 14px;
      }
      p {
        word-break: break-all;
        color: #a5a9ac;
        margin: 0;
        font-size: 14px;
        line-height: 21px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
