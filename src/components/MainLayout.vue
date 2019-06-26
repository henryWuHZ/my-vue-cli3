<template>
  <div class="home-main">
    <header class="home-header">
      <slot name="header"></slot>
    </header>
    <div class="main-wrapper relative" :class="{hideSidebar:!opened}">
      <div class="sidebar-wrapper">
        <slot name="aside"></slot>
      </div>
      <div class="content-wrapper" id="admin-content-wrapper">
        <slot name="main"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      opened: { type: Boolean, default: true },
      showSideBtn: { type: Boolean, default: true }
    },
    data () {
      return {
      }
    },
    watch: {},
    mounted () {
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  .home-main {
    width: 100%;
    height: 100%;
    .home-header {
      width: 100%;
      height: 60px;
      background-image: linear-gradient(
          -90deg,
          #282e40 0%,
          #38435c 52%,
          #282f40 100%
      );
      color: #ffffff;
      position: absolute;
      top: 0;
    }
    .main-wrapper {
      width: 100%;
      height: calc(100% - 60px);
      overflow: auto;
      position: absolute;
      top: 60px;
      .content-wrapper {
        min-width: 1366px;
        height: 100%;
        box-sizing: border-box;
        transition: all 0.28s ease-out;
        padding-left: 180px;
        background: #f5f6fa;
        overflow: auto;
      }
      .btn {
        font-size: 10px;
        width: 42px;
        height: 28px;
        position: absolute;
        left: 125px;
        top: 25px;
        transform: translateY(-50%);
        z-index: 900;
        transition: all 0.28s ease-out;
        cursor: pointer;
        background: #277182;
        border-radius: 4px;
        text-align: center;
        i {
          color: #bfcbd9;
          line-height: 30px;
        }
        &:hover {
          opacity: 0.8;
        }
        .el-icon-sort {
          transform: rotate(90deg);
          color: #ffffff;
        }
      }
      &.hideSidebar {
        .sidebar-wrapper {
          transform: translate(-130px, 0);
          .sidebar-container {
            transform: translate(130px, 0);
          }
        }
        .content-wrapper {
          padding-left: 50px;
          margin-left: 0;
        }
        .btn {
          left: 133px;
        }
        .el-menu{
          float: right;
        }
      }
      .sidebar-wrapper {
        background-color: #48494d;
        width: 180px;
        height: calc(100%);
        min-height: 400px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        transition: all 0.28s ease-out;
        overflow-x: hidden;
        z-index: 888;
        .el-menu{
          text-align: left;
        }
      }
      .sidebar-container {
        transition: all 0.28s ease-out;
        height: 100%;
        background: #1c212e;
      }
    }
  }
</style>
