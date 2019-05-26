<template>
  <div class="split" :style="`height:${height}px`"></div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    height: {
      type: Number,
      default: 16
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .split
    width: 100%
    border-top: 1px solid rgba(7, 17, 27, 0.1)
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    background: #f3f5f7
</style>
