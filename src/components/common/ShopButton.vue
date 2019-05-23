<template>
  <div class="wrap">
    <!-- 增加按钮增加 vue 动画 -->
    <transition name="slide">
      <div
        class="food-decrease icon-remove_circle_outline"
        v-show="food.count > 0"
        @click="foodDecrease"
      ></div>
    </transition>
    <div class="food-num" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="food-add icon-add_circle" @click="foodAdd"></div>
  </div>
</template>

<script>
import Vue from 'vue';
// 给观测对象直接添加一个属性是不可以的，所以使用 Vue.set
export default {
  props: {
    food: {
      type: Object
    }
  },
  created() {
  },
  data () {
    return {};
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    foodAdd (event) {
      if (!event._constructed) {
        return;
      }
      // 这里的 food 是假数据，而假数据中没有 count 属性，这里使我们强行加入的
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
        this.food.count = 1;
      } else {
        this.food.count++;
      }
      // 这里将事件派发给小球动画
      this.$emit('food-add', event.target);
    },
    foodDecrease (event) {
      if (!event._constructed) {
        return;
      }
      this.food.count >= 1 && this.food.count--;
    }
  }
};
</script>
<style lang='stylus' ref='stylesheet/stylus'>
  .wrap
    font-size 0
  .food-decrease
    display inline-block
    font-size 24px
    line-height 24px
    padding 6px
    color #0898ee
    // 过渡的过程设定
    &.slide-enter-active,
    &.slide-leave-active
      transition all 0.4s linear
    // 过渡进入开始时、过渡离开结束时
    &.slide-enter,
    &.slide-leave-to
      opacity 0
      transform translate3d(24px, 0, 0) rotate(180deg)
  .food-num
    display: inline-block
    vertical-align: top
    width: 12px
    padding-top: 6px
    line-height: 24px
    text-align: center
    font-size: 12px
    color: rgb(147, 153, 159)
  .food-add
    display inline-block
    font-size 24px
    line-height 24px
    padding 6px
    color rgb(0, 160, 220)
</style>
