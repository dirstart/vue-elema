<template>
  <div class="header">
    <div class="content-wrap">
      <div class="avatar">
        <img :src="seller.avatar" width="64" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]">{{seller.supports}}</span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-counts" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrap" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <transition name="fade">
      <div class="detail"
        v-show="detailShow"
      >
        <div class="detail-wrap clearfix">
          <div class="detail-main">
            <h1 class="name">
              {{seller.name}}
            </h1>
            <div class="star-wrap">
              <sf-star :size="48" :score="3"/>
            </div>
            <sf-divider></sf-divider>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <sf-divider title="商家公告"></sf-divider>
            <div class="bulletin">
              <p class="content">
                {{seller.bulletin}}
              </p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="hideDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MaskDivider from './MaskDivider';
import star from '@/components/common/star/star.vue';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    SfStar: star,
    SfDivider: MaskDivider
  },
  data () {
    return {
      classMap: [],
      detailShow: false
    };
  },
  created () {
    const me = this;
    me.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
  },
  methods: {
    showDetail () {
      this.detailShow = true;
    },
    hideDetail () {
      this.detailShow = false;
    }
  }
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .header
    position relative
    color #fff
    background rgba(7, 17, 27, 0.4)
    overflow hidden
    .content-wrap
      position relative
      padding 24px 12px 18px 24px
      font-size 0
      .avatar
        display inline-block
        img
          border-radius 2px
      .content
        margin-left 16px
        display inline-block
        vertical-align top
        .title
          margin 2px 0 8px 0
          .brand
            display: inline-block
            width 30px
            height 18px
            vertical-align top
            bg-image('./img/brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold
        .description
          margin-bottom 10px
          font-size 12px
        .support
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('./img/decrease_1')
            &.discount
              bg-image('./img/discount_1')
            &.guarantee
              bg-image('./img/guarantee_1')
            &.invoice
              bg-image('./img/invoice_1')
            &.special
              bg-image('./img/special_1')
          .text
            font-size 10px
            line-height 12px
      .support-counts
        position absolute
        right 12px
        bottom 14px
        padding 0 8px
        height 24px
        line-height 24px
        border-radius 14px
        background rgba(0, 0, 0, 0.2)
        text-align center
        .count
          font-size 10px
        .icon-keyboard_arrow_right
          margin-left 2px
          line-height 24px
          font-size 10px
    .bulletin-wrap
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      background rgba(7, 17, 27, 0.2)
      .bulletin-title
        display inline-block
        margin-top 8px
        vertical-align top
        width 22px
        height 12px
        bg-image('./img/bulletin')
        backgournd-repeat no-repeat
        background-size 22px 12px
      .bulletin-text
        vertical-align top
        margin 0 4px
        font-size 10px
      .icon-keyboard_arrow_right
        position absolute
        font-size 10px
        bottom 8px
        right 12px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter blur(10px)
    .detail
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      overflow auto
      z-index 100
      opacity: 1
      background: rgba(7, 17, 27, 0.8)
      transition all 0.5s
      -webkit-backdrop-filter blur(10px)
      &.fade-enter-active,
      &.fade-leave-active
        transition: all 0.5s
      &.fade-enter,
      &.fade-leave-active
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .detail-wrap
        display inline-block
        min-height 100%
        width 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            line-height 16px
            text-align center
            font-size 16px
            font-weight 700
          .star-wrap
            margin 16px 0
            text-align center
          .supports
            width 80%
            margin 0 auto
            .support-item
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .icon
                margin-right 6px
                background yellow
                width 16px
                height 16px
                display inline-block
                background-size 16px 16px
                background-repeat no-repeat
                vertical-align top
                &.decrease
                  bg-image('./img/decrease_2')
                &.discount
                  bg-image('./img/discount_2')
                &.guarantee
                  bg-image('./img/guarantee_2')
                &.invoice
                  bg-image('./img/invoice_2')
                &.special
                  bg-image('./img/special_2')
              .text
                font-size 12px
                line-height 16px
          .bulletin
            width 80%
            margin 0 auto
            .content
              padding 0 12px
              line-height 24px
              font-size 12px
              text-indent 24px
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        // 通过上面这个 margin: 0 auto 实现的水平居中
        clear both
        font-size 32px

</style>
