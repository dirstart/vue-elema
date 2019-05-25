<template>
  <div>
    <div class="shopcart-wrap">
      <div class="content" @click="toggleList">
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
        <div class="right" @click.stop.prevent="onPay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <!-- 小球动画 -->
      <div class="ball-content">
        <!-- transition 是一个动画描述，监听 show:false/true 的转换 -->
        <div v-for="(ball, index) in balls" :key = "index">
          <transition name="drop"
            @before-enter="beforeDrop"
            @enter="onDrop"
            @after-enter="afterDrop"
          >
            <!-- 之所以采用双层的缘故是，外层是纵轴的transition，里层是横轴的 -->
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <!-- 购物车详情 -->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="emptyAll">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="list-item" v-for="(item, index) in selectFoods" :key="index">
                <span class="item-name">{{item.name}}</span>
                <div class="item-price">
                  <span>￥{{item.count * item.price}}元</span>
                </div>
                <div class="shop-button-wrap">
                  <shop-button :food="item" @food-add="foodAdd"></shop-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!-- 购物车弹起的遮罩 -->
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideMask"></div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import ShopButton from '@/components/common/ShopButton.vue';
export default {
  /**
   * @param {array} selectFoods 所选的所有商品的数组
   * @param {number} deliveryPrice 配送费
   * @param {number} minPricfe 起送价
   */
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
  created () {
    const arr = new Array(1);
    arr.fill({show: false});
    this.balls = arr;
  },
  data () {
    return {
      // 小球数组 - 小球的位置{x, y}，小球的显示和隐藏 true/false
      balls: [],
      dropBalls: [],
      fold: true
    };
  },
  components: {
    ShopButton
  },
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
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    // 起送价 - 如果为 0 则显示还差多少起送
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      }
      let diff = this.minPrice - this.totalPrice;
      return diff > 0 ? `还差${diff}元起送` : '去结算';
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    },
    listShow: {
      get () {
        if (this.totalCount <= 0) {
          return false;
        }
        // 没有折叠才是展开
        return !this.fold;
      },
      set () {
        if (this.totalCount <= 0) {
          this.fold = false;
        }
        if (!this.fold) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
      }
    }
  },
  mounted() {},
  methods: {
    /**
     * 购物车列表
     */
    toggleList () {
      if (this.totalCount <= 0) {
        return;
      }
      this.fold = !this.fold;
    },
    foodAdd (target) {
      this.drop(target);
    },
    // 清空购物表
    emptyAll () {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
      this.listShow = false;
    },
    // 取消遮罩
    hideMask () {
      this.fold = true;
    },
    // 结算
    onPay () {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      window.alert(`支付${this.totalPrice}元`);
    },
    /**
     * 小球动画
     */
    drop (el) {
      // 遍历所有的小球，触发缓动函数
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          // 触发缓动函数 transition
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    // 设置小球一开始的初始位置，将小球由 css 设置的终末位置拉上来
    beforeDrop (el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = 'block';
          // 移动纵轴
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          // 移动横轴
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    // 设置小球的终末位置
    onDrop (el, done) {
      // !!! 此句话是主动触发浏览器重绘。获取 offset 可以触发浏览器重绘，触发 dom 更新
      // 重绘才可以让小球先移动到 + 号这里，然后作动画
      // 不重绘的话 beforeDrop 作的东西都没有意义了
      // eslint-disable-next-line
      let rf = el.offsetHeight;
      // 在 dom 更新后立即执行，有点 await 的效果
      this.$nextTick(() => {
        // 纵轴
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        // 横轴
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        // 以下为官网解释
        // 在很多情况下，Vue 可以自动得出过渡效果的完成时机。
        // 默认情况下，Vue 会等待其在过渡效果的根元素的第一个 transitionend 或 animationend 事件。
        el.addEventListener('transitionend', done);
      });
    },
    // 重复利用
    afterDrop (el) {
      let ball = this.dropBalls.shift();
      // 为了无限循环的使用，还原 ball 的display状态为 none
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    }
  }
};
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
  @import "../../common/stylus/mixin.styl"

  .shopcart-wrap
    position fixed
    left 0
    bottom 0
    width 100%
    z-index 51
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
    // 总结：纵轴的贝塞尔 + 横轴的 linear 实现了效果
    .ball-content
      .ball
        position fixed
        left 32px
        bottom 32px
        z-index 200
        // 所有动作效果在 0.4s 内，通过贝塞尔曲线的频率规则 来实现
        // 纵轴的缓动，贝塞尔移动 - 试下linear效果也还行
        transition all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background rgb(0, 160, 220)
          // 横轴的缓动，线性移动
          transition all 0.4s linear
    // 所有的高度均有内部的元素撑开
    .shopcart-list
      position absolute
      top 0
      left 0
      // 防止遮挡圆形区域
      z-index -1
      width 100%
      // 动画的最终状态
      transform translate3d(0, -100%, 0)
      &.fold-enter-active
      &.fold-leave-active
        transition all .5s
      // 动画的开始状态，和动画的离开状态
      &.fold-enter
      &.fold-leave-to
        transform  translate3d(0, 0, 0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, .1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)
      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .list-item
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7, 17, 27, .1))
          .item-name
            font-size 14px
            line-height 24px
            color rgb(7, 17, 27)
          .item-price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .shop-button-wrap
            position absolute
            right 0
            bottom 6px
  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background rgba(7, 17, 27, .6);
    // iPhone手机下的模糊效果
    backdrop-filter: blur(10px)
    z-index 50
    &.fade-enter-active
    &.fade-leave-active
      transition all .4s
    &.fade-enter
    &.fade-leave-to
      opacity 0
</style>
