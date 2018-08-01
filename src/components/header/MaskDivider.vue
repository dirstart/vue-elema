<template>
    <div class="title-wrap">
      <div class="line"></div>
      <div class="title">{{title}}</div>
      <div class="line"></div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '优惠信息'
    }
  }
};
</script>

<style lang="stylus" scoped>
  .title-wrap
    display flex
    margin 30px auto 24px auto
    width 80%
    .line
      position relative
      flex: 1
      top -6px
      border-bottom 1px solid rgba(255, 255, 255, .2)
    .title
      padding 0 12px
      font-weight 700
      font-size 12px
</style>
