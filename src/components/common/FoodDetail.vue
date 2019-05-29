<template>
  <transition name="slide">
    <div class="food-wrap" v-show="showFlag" ref="food">
      <div class="food-content">
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
                <!-- food-add 这里是点击 + 之后，组件会自动触发的事件 -->
                <shop-button :food="food" @food-add="foodAdd"></shop-button>
              </div>
              <!-- 如果这个时候还没有将商品加入购物车 -->
              <transition name="first-choose">
                <div class="first-shop-button-wrap"
                  v-show="!food.count || food.count === 0"
                  @click.stop.prevent="foodAddFirst"
                >加入购物车</div>
              </transition>
            </div>
          </div>
        </div>
        <common-split v-show="food.info"></common-split>
        <div class="food-info-wrap" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <common-split></common-split>
        <div class="food-rating-wrap">
          <h1 class="title">商品评价</h1>
          <rating-select
            :rating-select="selectType"
            :only-content="onlyContent"
            :desc="desc"
            :ratings="food.ratings"
            @change-only-content="changeOnlyContent"
            @change-select-type="changeSelectType"
          ></rating-select>
          <!-- 评价列表 -->
          <food-rating
            v-show="food.ratings && food.ratings.length"
            :rating-list="food.ratings"
            :only-content="onlyContent"
            :select-type="selectType"
          ></food-rating>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import CommonSplit from '@/components/common/CommonSplit.vue';
import ShopButton from '@/components/common/ShopButton.vue';
import RatingSelect from '@/components/common/RatingSelect.vue';
import FoodRating from '@/components/common/FoodRating.vue';
const All = 2;
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
      showFlag: false,
      // 默认的子页面选择项
      selectType: All,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  components: {
    CommonSplit,
    ShopButton,
    RatingSelect,
    FoodRating
  },
  computed: {},
  mounted() {},
  methods: {
    show () {
      this.showFlag = true;
      // 置回默认选项
      this.onlyContent = true;
      this.selectType = All;
      this.$nextTick(() => {
        if (!this.foodDetailScroll) {
          this.foodDetailScroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.foodDetailScroll.refresh();
        }
      });
    },
    changeOnlyContent () {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.foodDetailScroll.refresh();
      });
    },
    changeSelectType (type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      })
    },
    goBack () {
      this.showFlag = false;
    },
    foodAdd () {
      // 这里要触发小球动画
      this.$emit('father-add', event.target);
    },
    foodAddFirst (event) {
      // 跳过 better-scroll
      if (!event._constructed) {
        return;
      }
      // 手动设置
      Vue.set(this.food, 'count', 1);
      // 此时还需要触发小球动画
      this.$emit('father-add', event.target);
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
    bottom 48px
    width 100%
    z-index 30
    background #fff
    transform translate3d(0, 0, 0)
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
          // 为了保持在同一水平线上
          top -6px
          right 10px
        .first-shop-button-wrap
          position absolute
          top 0
          right 10px
          color #fff
          background #00a0dc
          font-size 10px
          padding 0 12px
          height 24px
          line-height 24px
          border-radius 12px
          opacity 1
          &.first-choose-enter
          &.first-choose-leave-to
            opacity 0
          &.first-choose-enter-active
          &.first-choose-leave-active
            transition all .5s ease
    .food-info-wrap
      padding 10px 18px
      .title
        line-height 24px
        height 24px
        font-size 14px
        color #07111b
        font-weight 700
      .text
        padding 0 8px
        font-size 12px
        line-height 24px
        text-indent 24px
        color: #4d555d
    .food-rating-wrap
      padding 10px 0px
      .title
        margin-left 18px
        height 24px
        line-height 24px
        font-size 14px
        font-weight 700
        color #07111b
</style>
