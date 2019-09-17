<template>
  <div class="common-table-layout">
    <header class="head-part">
      <slot name="header"></slot>
    </header>
    <main class="main-part">
      <slot name="main"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {

        }
    },
    components: {

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
.common-table-layout {
  .head-part {
    height: 60px;
    background: #fff;
    line-height: 60px;
    text-align: left;
    padding: 0 20px;
    box-sizing: border-box;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .main-part {
    background: #fff;
    padding: 20px;
    margin-top: 20px;
    box-sizing: border-box;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
