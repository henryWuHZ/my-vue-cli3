<template>
  <div
    class="card-default-layout"
    :style="`min-width:${width}px;min-height:${height}px`"
  >
    <slot name="content">
    </slot>
  </div>
</template>

<script>
export default {
    name: 'CardLayout',
    props: {
        width: { type: Number, default: 250 },
        height: { type: Number, default: 300 }
    },
    data () {
        return {}
    },
    components: {},
    created () {
    },
    methods: {}
}
</script>

<style lang="scss">
.card-default-layout {
  background: #ffffff;
  box-shadow: 0 0 8px 0 rgba(96, 98, 107, 0.16);
  border-radius: 4px;
  transition: transform 0.5s;
  cursor: pointer;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 4px 30px 0 rgba(115, 115, 120, 0.24);
  }
}
</style>
