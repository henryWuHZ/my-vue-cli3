<template>
  <div class="entrances-page">
    <el-container>
      <el-header>
        <span style="float: left;">导航页</span>
      </el-header>
      <el-main>
        <card-layout>
          <div slot="content" @click="$router.push('/main')">
            test-card
          </div>
        </card-layout>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import CardLayout from '@/components/CardLayout'

  export default {
    name: 'entrances',
    data () {
      return {}
    },
    components: { CardLayout },
    created () {
    },
    methods: {}
  }
</script>

<style lang="scss">
  .entrances-page {
    .el-header {
      line-height: 60px;
      background-image: linear-gradient(-90deg, #282e40 0%, #38435c 52%, #282f40 100%);
      color: #ffffff;
      font-size: 16px;
    }
  }
</style>
