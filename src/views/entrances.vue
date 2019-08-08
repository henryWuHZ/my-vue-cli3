<template>
  <div class="entrances-page">
    <el-container>
      <el-header>
        <div style="float:left;display:flex;align-items: center;">
          <img
            :src="defaultLogo"
            style="width:40px;height:40px;border-radius:2px;float:left;margin-right:10px;"
          />
          <span style="float: left;">克拉汽车改装</span>
        </div>
      </el-header>
      <el-main>
        <div class="left-part">
          <!-- <el-radio-group v-model="isCollapse">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group> -->
          <!-- <my-video></my-video> -->
          <el-button @click="showDrawer=true">xianshi</el-button>
          <el-menu
            style="text-align:left;border-radius:2px;"
            default-active="activeIndex"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">导航一</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-setting"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="right-part">
          <el-carousel
            :interval="2000"
            type="card"
            height="300px"
          >
            <el-carousel-item
              v-for="item in 6"
              :key="item"
            >
              <h3 class="medium">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
          <!-- <div>
            <el-input
              v-model="searchKey"
              placeholder="搜索关键字"
              @keyup.enter.native="handleSearch"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </div> -->
          <div style="position:relative;margin: 0 10px;">
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
            <span style="    position: absolute;right: 0;top: 8px;">查看全部<i class="el-icon-arrow-right"></i></span>
          </div>
          <div class="card-list">
            <!-- <card-layout>
              <div
                slot="content"
                @click="$router.push('/main')"
              >
                test-card
                <el-tooltip
                  content="sadasdasd"
                  effect="dark"
                  placement="top"
                >
                  <span>asdasdsa</span>
                </el-tooltip>
              </div>
            </card-layout> -->
            <card-layout class="car-card">
              <div
                slot="content"
                style="padding: 10px;"
              >
                <div
                  class="hover-zoom"
                  style="width:100%;height: 150px;border-radius:4px;"
                  :style="`background-image: url(${test1})`"
                ></div>
              </div>
            </card-layout>
            <card-layout class="car-card">
              <div
                slot="content"
                style="padding: 10px;"
              >
                <div
                  class="hover-zoom"
                  style="width:100%;height: 150px;border-radius:4px;"
                  :style="`background-image: url(${test2})`"
                ></div>
              </div>
            </card-layout>
            <card-layout class="car-card">
              <div
                slot="content"
                style="padding: 10px;"
              >
                <div
                  class="hover-zoom"
                  style="width:100%;height: 150px;border-radius:4px;"
                  :style="`background-image: url(${test2})`"
                ></div>
              </div>
            </card-layout>
            <card-layout class="car-card">
              <div
                slot="content"
                style="padding: 10px;"
              >
                <div
                  class="hover-zoom"
                  style="width:100%;height: 150px;border-radius:4px;"
                  :style="`background-image: url(${test2})`"
                ></div>
              </div>
            </card-layout>
            <card-layout class="car-card">
              <div
                slot="content"
                style="padding: 10px;"
              >
                <div
                  class="hover-zoom"
                  style="width:100%;height: 150px;border-radius:4px;"
                  :style="`background-image: url(${test2})`"
                ></div>
              </div>
            </card-layout>
            <card-layout class="car-card">
              <div
                slot="content"
                style="padding: 10px;"
              >
                <div
                  class="hover-zoom"
                  style="width:100%;height: 150px;border-radius:4px;"
                  :style="`background-image: url(${test2})`"
                ></div>
              </div>
            </card-layout>
          </div>
        </div>
      </el-main>
    </el-container>
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
// import MyVideo from '@/components/MyVideo'
import MyDrawer from '@/components/MyDrawer'
let defaultLogo = require('../static/logo.jpg')
let test1 = require('../static/info1.jpg')
let test2 = require('../static/info2.jpg')

export default {
    name: 'entrances',
    data () {
        return {
            showDrawer: false,
            isCollapse: false,
            activeIndex: '',
            activeName: 'latest',
            searchKey: '',
            defaultLogo: defaultLogo,
            test1: test1,
            test2: test2
        }
    },
    components: { CardLayout, MyDrawer },
    created () {
    },
    methods: {
        handleClick (val) {},
        handleSelect (val) {}
    }
}
</script>

<style lang="scss">
.entrances-page {
  .card-list {
    margin-top: 20px;
    .car-card {
      float: left;
      margin: 10px;
    }
  }
  .el-carousel__button {
    height: 4px;
    border-radius: 2px;
  }
  .el-header {
    line-height: 60px;
    background-image: linear-gradient(
      -90deg,
      #282e40 0%,
      #38435c 52%,
      #282f40 100%
    );
    color: #ffffff;
    font-size: 16px;
  }
  .left-part {
    width: 30%;
    float: left;
  }
  .right-part {
    float: left;
    width: calc(70% - 24px);
    margin-left: 24px;
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
  }
}
</style>
