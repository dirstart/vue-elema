<template>
  <transition name="slide">
    <div class="food-wrap" v-show="showFlag">
      <div class="food-detail-wrap">
        <div class="detail-picture">
          <img :src="food.image" alt="">
          <div class="back-icon" @click="goBack">
            <!-- &lt;&lt;&nbsp;返回 -->
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="detail-text">
          <h1 class="text-name">
            {{food.name}}
          </h1>
          <div class="text-group">
            <span class="group-sales">
              月售{{food.sellCount}}份
            </span>
            <span class="group-feedback">
              好评率{{food.rating || 100}}%
            </span>
          </div>
          <div class="text-price">
            <span class="now-price">￥{{food.price}}</span>
            <span class="old-price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
            <div class="shop-button-wrap">
              <shop-button :food="food"></shop-button>
            </div>
          </div>
        </div>
      </div>
      <common-split></common-split>
      <div class="food-rating-wrap">
        <h1 class="rating-text">商品评价</h1>
        <ul class="rating-tag">
        </ul>
        <div class="only-something"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import CommonSplit from '@/components/common/CommonSplit.vue';
import ShopButton from '@/components/common/ShopButton.vue';
export default {
  props: {
    food: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      showFlag: false
    };
  },
  components: {
    CommonSplit,
    ShopButton
  },
  computed: {},
  mounted() {},
  methods: {
    show () {
      this.showFlag = true;
      this.$nextTick(() => {
        console.log('food', this.food);
      });
    },
    goBack () {
      this.showFlag = false;
    }
  }
};
</script>
<style lang='stylus' ref='stylesheet/stylus'>
  @import "../../common/stylus/mixin.styl"

  .food-wrap
    position fixed
    top 0
    left 0
    bottom 46px
    width 100%
    overflow hidden
    z-index 30
    background #fff
    &.slide-enter
    &.slide-leave-to
      transform translate3d(100%, 0, 0)
    &.slide-enter-active
    &.slide-leave-active
      transition all .4s ease
    .detail-picture
      position relative
      width 100%
      height 0
      // 这是一个黑魔法，w3c中，若 height 为 0，则 padding 的百分比为 宽度的百分比
      // 防抖动的黑魔法
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        // 使图片宽高为外层的宽高100%
        width 100%
        height 100%
      .back-icon
        position absolute
        top 10px
        left 0
        background #333
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #fff
        // position absolute
        // top 10px
        // left 10px
        // font-size 14px
        // height 16px
        // line-height 16px
        // border-radius 5px
        // background-color #888
        // color #fff
        // padding 3px
    .detail-text
      position relative
      padding 18px
      .text-name
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7, 17, 27)
      .text-group
        margin-bottom 18px
        color #93999f
        font-size 10px
        .group-sales
        .group-feedback
          margin-right 12px
      .text-price
        line-height 24px
        position relative
        .now-price
          font-size 14px
          color red
          margin-right 8px
        .old-price
          font-size 10px
          color #93999f
          text-decoration line-through
        .shop-button-wrap
          position absolute
          top 0
          right 10px
</style>
