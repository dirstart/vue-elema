<template>
  <div class="wrap">
    <div class="content">
      <div class="left">
        <div class="icon-wrap">
          <i class="icon" :class="{highlight: totalCount > 0}">
            <!-- 下面这个也要加个 class -->
            <i class="icon-shopping_cart" :class="{highlight: totalCount > 0}"></i>
          </i>
          <span class="num" v-show="totalCount > 0">
            {{totalCount}}
          </span>
        </div>
        <div class="price" :class="{highlight: totalCount > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 思考过程，该组件的商品价值是由 父元素 goods 的选择来决定的，所以需要一个对象来保存选择的价格们
    selectFoods: {
      type: Array,
      default () {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {};
  },
  components: {},
  computed: {
    // 返回总价
    totalPrice () {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    // 返回数量
    totalCount () {
      let count = this.selectFoods && this.selectFoods.length || 0;
      return count;
    },
    // 起送价 - 如果为 0 则显示还差多少起送
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return '去结算';
      } 
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    },
  },
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
            background: #2b343c
            font-size 12px
            text-align center
            &.highlight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color: #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            left 30px
            width 24px
            height 16px
            line-height 16px
            border-radius 16px
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, .4)
            font-size 12px
            font-weight 700
            text-align center
            color #fff
        .price
          margin-top 12px
          display: inline-block
          padding 0 12px
          width auto
          height 24px
          line-height 24px
          color #666
          font-size 16px
          font-weight 700
          vertical-align top
          border-right 1px solid rgba(255, 255, 255, 0.1)
          &.highlight
            color #fff
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
        .pay
          height 48px
          line-height 48px
          font-size 12px
          color rgba(255, 255, 255, .4)
          font-weight 700
          text-align center
          &.not-enough
            background #333
          &.enough
            background: #00b43c
            color: #fff

</style>
