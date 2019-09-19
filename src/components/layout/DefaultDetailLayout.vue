<template>
  <div class="default-detail-layout">
    <header class="header-part">
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
.default-detail-layout {
  background: #fff;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .header-part {
    height: 60px;
    background: #fff;
    line-height: 60px;
    border-bottom: 1px solid #babfca;
  }
  .main-part {
    margin-top: 20px;
  }
}
</style>
