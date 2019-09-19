<template>
  <div class="page">
    <default-layout>
      <template #header>
        <p>产品列表</p>
      </template>
      <template #main>
        <el-button
          @click="$router.push('/addProduction')"
          type="primary"
        >新增</el-button>
      </template>
    </default-layout>
  </div>
</template>

<script type="text/ecmascript-6">
import DefaultLayout from '@/components/layout/CommonTableList'
export default {
    data () {
        return {

        }
    },
    components: {
        DefaultLayout
    },
    created () {

    },
    mounted () {

    },
    methods: {

    }
}
</script>

<style scoped lang="scss">
</style>
