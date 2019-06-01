<template>
  <div class="seller-wrap" ref="seller">
    <div class="seller-content">
      <!-- 商家概览 -->
      <div class="seller-overview border-1px">
        <div class="overview-left">
          <h1 class="seller-name">
            {{seller.name}}
          </h1>
          <div class="star-wrapper">
            <sf-star class="seller-star" :size="36" :score="seller.score"></sf-star>
            <span class="rating-count">
              （{{seller.ratingCount}}）
            </span>
            <span class="sell-count">
              月售{{seller.sellCount}}单
            </span>
          </div>
        </div>
        <div class="overview-right" @click="toggleCollect">
            <div class="icon-favorite" :class="{'active':haveCollect}"></div>
            <div class="icon-text">{{collectText}}</div>
        </div>
      </div>
      <!-- 商家起送价、配送时间、平均配送时间 -->
      <div class="seller-about">
        <div class="about-block min-price">
          <div class="about-text">
            起送价
          </div>
          <span class="about-number">{{seller.minPrice}}</span>元
        </div>
        <div class="about-block delivery-price">
          <div class="about-text">
            商家配送
          </div>
          <span class="about-number">{{seller.deliveryPrice}}</span>元
        </div>
        <div class="about-block delivery-time">
          <div class="about-text">
            平均配送时间
          </div>
          <span class="about-number">{{seller.deliveryTime}}</span>分钟
        </div>
      </div>
      <!-- 间隔 -->
      <common-split></common-split>
      <div class="seller-activity">
        <h1>公告与活动</h1>
        <p class="notice-text">
          {{seller.bulletin}}
        </p>
        <ul class="activity-list" v-if="seller.supports">
          <li class="activity-item border-1px" v-for="(item,index) in seller.supports" :key="index">
            <span class="activity-icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="item-text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import star from '@/components/common/star/star.vue';
import CommonSplit from '@/components/common/CommonSplit.vue';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      haveCollect: false
    };
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this._initScroll();
  },
  components: {
    SfStar: star,
    CommonSplit
  },
  computed: {
    collectText () {
      return this.haveCollect ? '已收藏' : '收藏';
    }
  },
  mounted() {},
  methods: {
    _initScroll () {
      this.$nextTick(() => {
        this.sellerScroll = new BScroll(this.$refs.seller, {
          click: true
        });
      });
    },
    toggleCollect () {
      this.haveCollect = !this.haveCollect;
    }
  }
};
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
  @import "../../common/stylus/mixin.styl"
  .seller-wrap
    position absolute
    top 174px
    left 0
    bottom 0
    width 100%
    overflow hidden
    .seller-overview
      display flex
      padding 18px 18px 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      .overview-left
        flex 1
        .seller-name
          font-size 14px
          color rgb(7, 17, 27)
          line-height 14px
        .star-wrapper
          margin 8px 8px 18px 0
          .seller-star
            display inline-block
            font-size 0
          .rating-count
          .sell-count
            vertical-align top
            display inline-block
            font-size 10px
            color rgb(77, 85, 93)
            line-height 18px
      .overview-right
        flex 0 0 30px
        text-align center
        .icon-favorite
          font-size 24px
          line-height 24px
          color #d4d6d9
          &.active
            color rgb(240, 20, 20)
        .icon-text
          margin-top 4px
          font-size 10px
          line-height 10px
          color rgb(77, 85, 93)
    .seller-about
      display flex
      margin 18px
      text-align center
      .about-block
        flex 1
        font-size 10px
        border-right 1px solid rgba(7, 17, 27, .1)
        &:last-child
          border none
        .about-text
          font-size 10px
          color rgb(147, 153, 159)
          line-height 10px
          margin-bottom 4px
        .about-number
          font-size 24px
          font-weight 200
          color rgb(7, 17, 27)
          line-height 24px
    .seller-activity
      margin 18px
      h1
        margin-bottom 8px
      .notice-text
        padding 0 12px
        font-size 12px
        color rgb(240, 20, 20)
        line-height 24px
      .activity-list
        margin-top 16px
        .activity-item
          padding 16px 12px
          border-1px(rgba(7, 17, 27, .1))
          &:last-child
            border-none()
          .activity-icon
            display inline-block
            width 16px
            height 16px
            vertical-align top
            margin-right 6px
            background-size 16px 16px
            background-repeat no-repeat
            &.decrease
              bg-image('./img/decrease_4')
            &.discount
              bg-image('./img/discount_4')
            &.guarantee
              bg-image('./img/guarantee_4')
            &.invoice
              bg-image('./img/invoice_4')
            &.special
              bg-image('./img/special_4')
          .item-text
            line-height 16px
            font-size 12px
            color rgb(7, 17, 27)
</style>
