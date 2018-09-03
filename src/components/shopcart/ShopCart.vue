<template>
  <div class="wrap">
    <div class="content">
      <div class="left">
        <div class="icon-wrap">
          <i class="icon">
            <i class="icon-shopping_cart"></i>
          </i>
        </div>
        <div class="price">￥0</div>
        <div class="desc">另需配送费￥10元</div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
  .wrap
    position fixed
    left 0
    bottom 0
    width 100%
    z-index 50
    height 48px
    .content
      display flex
      height 100%
      background #141d27
      color #fff
      .left
        flex 1
        color #fff
        font-size 0
        .icon-wrap
          position relative
          vertical-align top
          top -10px
          margin 0 12px
          display inline-block
          width 56px
          height 56px
          box-sizing border-box
          padding 6px
          background #141d27
          border-radius 50%
          .icon
            display inline-block
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            font-size 12px
            text-align center
            .icon-shopping_cart
              line-height 44px
              font-size 24px
        .price
          margin-top 12px
          display: inline-block
          padding 0 12px
          width 24px
          height 24px
          line-height 24px
          font-size 16px
          font-weight 700
          vertical-align top
          border-right 1px solid rgba(255, 255, 255, 0.1)
        .desc
          display: inline-block
          padding 0 12px
          font-size 12px
          color: rgba(255, 255, 255, .4)
          line-height 48px
          font-weight 700
      .right
        flex 0 0 105px
        width 105px
</style>
