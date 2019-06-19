<template>
  <div class="head-msg">
    <el-popover placement="bottom" trigger="click">
      <el-badge slot="reference" :value="parseInt(totalNotes)" :max="99">
          <i class="el-icon-message" style="font-size: 25px"></i>
        </el-badge>
      <div class="notes-list">
        <div class="header">
          <p>通知</p>
        </div>
        <div class="content">
          <template v-if="notesList.length > 0">
            <div class="note-item" v-for="(item, index) in notesList" :key="index">
              <p class="title" :title="item.title" @click="toNoteDetail(item.id)">{{item.title}}</p>
              <a
                v-if="item.url && item.url !== ''"
                :href="item.url + '&fileType=download'"
                target="_blank"
                download
              >下载附件</a>
            </div>
          </template>
          <img
            v-if="notesList.length === 0"
            style="width: 144px;height: 96px;margin-top: 75px;"
            src="../static/img/notes_blank.png"
          >
          <p v-if="notesList.length === 0" style="line-height: 0;text-align: center;color: #48494d">没有新消息</p>
        </div>
        <div class="footer">
          <p style="margin: 0;">查看全部</p>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
  export default {
    name: 'HeadMsg',
    props: {},
    data () {
      return {
        showNotes: false,
        totalNotes: 50,
        notesList: []
      }
    },
    components: {},
    created () {
    },
    methods: {
      toNoteDetail (id) {
        console.log(id)
      }
    }
  }
</script>

<style lang="scss">
.head-msg{
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  .notes {
    padding-right: 20px;
    margin: 0 10px;
    cursor: pointer;
    &:hover {
      color: #3a8ee6;
    }
    &:before {
      content: " ";
      position: absolute;
      width: 2px;
      height: 24px;
      opacity: 0.1;
      background-color: #ffffff;
      border-radius: 1px;
      right: 10px;
      top: 20px;
    }
    .el-badge__content {
      font-size: 10px;
    }
  }
  .active-notes {
    color: #3a8ee6;
  }
  .notes-list {
    position: absolute;
    width: 300px;
    left: -200px;
    top: 54px;
    background: #ffffff;
    border: 1px solid #dcdee6;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    height: 340px;
    z-index: 1000;
    .header {
      font-size: 16px;
      color: #48494d;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #dcdee6;
      p {
        margin: 0 20px;
      }
    }
    .content {
      height: 245px;
      display: block;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #dcdee6;
      color: #48494d;
      .note-item {
        position: relative;
        width: 260px;
        margin: 0 auto;
        display: flex;
        height: 46px;
        line-height: 46px;
        border-bottom: 1px solid #dcdee6;
        .title {
          cursor: pointer;
          &:hover {
            color: #3a8ee6;
          }
        }
        p {
          width: 170px;
          height: 46px;
          padding-left: 15px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          &:before {
            content: " ";
            width: 10px;
            height: 10px;
            border-radius: 10px;
            background-color: #f56c6c;
            position: absolute;
            top: 18px;
            left: 0px;
          }
        }
        a {
          margin-left: 10px;
        }
      }
      a {
        margin-left: 10px;
      }
    }
    .footer {
      font-size: 14px;
      color: #48494d;
      p {
        text-align: center;
        height: 44px;
        line-height: 44px;
        cursor: pointer;
        &:hover {
          color: #3a8ee6;
        }
      }
    }
  }
}
</style>
