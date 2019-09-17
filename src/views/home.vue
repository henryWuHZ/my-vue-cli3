<template>
  <div class="home-page">
    <main-layout :opened="opened">
      <div slot="header">
        <div class="user-info">
          <!-- <div
            class="change-role-btn"
            @click="handleChangePlatform"
          >
            <div class="btn">
              返回导航页
              <i class="el-icon el-icon-back"></i>
            </div>
          </div>
          <head-msg></head-msg> -->
          <div
            class="el-dropdown-link"
            style="display: inline-flex;align-items: center"
          >
            <img
              :src="defaultUserLogo"
              style="width: 32px;height: 32px;border-radius: 32px;margin-right: 10px"
            >
            {{nickname}}
          </div>
          <el-dropdown
            @command="handleCommand"
            placement="bottom-end"
            trigger="click"
            @visible-change="handleShow"
          >
            <i
              class="info-menu-select"
              :class="(showSelect ? 'el-icon-arrow-up ': 'el-icon-arrow-down ') + 'el-icon--right'"
              style="margin-left: 10px;cursor: pointer"
            ></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="signOut">
                <i class="el-icon el-icon-switch-button">&nbsp;&nbsp;</i>退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div slot="aside">
        <div
          :class="'btn '+(opened?'':'btn-close')"
          @click="toggleSidebar"
        >
          <i class="el-icon-sort"></i>
        </div>
        <el-menu
          router
          :collapse="!opened"
          unique-opened
          style="margin-top: 60px;border-right:0;"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item :index="'/welcome'"><i class="el-icon-s-home"></i><span slot="title">首页</span></el-menu-item>
          <el-submenu index="/components">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">组件</span>
            </template>
            <el-menu-item index="/imgshow">图片预览</el-menu-item>
            <el-menu-item index="/chunkUploader">分片上传组件</el-menu-item>
          </el-submenu>
          <el-submenu index="/management">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">综合管理</span>
            </template>
            <el-menu-item index="/brandList">品牌列表</el-menu-item>
            <el-menu-item index="/modelList">型号列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div
        slot="main"
        style="padding: 20px"
      >
        <router-view></router-view>
      </div>
    </main-layout>
  </div>
</template>

<script>
import MainLayout from '@/components/MainLayout'
import HeadMsg from '@/components/HeadMsg'
let defaultUserLogo = require('../static/img/default_user_logo.jpg')

export default {
    name: 'home',
    data () {
        return {
            defaultUserLogo: defaultUserLogo,
            nickname: 'HenryWu',
            showSelect: false,
            opened: true
        }
    },
    components: { MainLayout, HeadMsg },
    created () {
    },
    methods: {
        toggleSidebar () {
            this.opened = !this.opened
        },
        handleChangePlatform () {
            this.$router.push('/entrances')
        },
        handleCommand () {},
        handleShow () {}
    }
}
</script>

<style lang="scss">
.home-page {
  .user-info {
    display: flex;
    float: right;
    height: 60px;
    align-items: center;
    padding-right: 20px;
    .change-role-btn {
      .btn {
        width: 108px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #ffffff;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        &:hover {
          color: #409eff;
          border-color: #409eff;
        }
      }
    }
  }
}
</style>
