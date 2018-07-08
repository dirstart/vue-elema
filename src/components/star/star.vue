<!--
    主要星星的分类可以用两个属性来控制。
    星星的内部颜色：  全星、半星、无星
    星星的大小： 24/36/48
    所以 starType - 大小、 itemClass - 颜色
    PS: 关于2x、3x图这里因为在 mixin 中区分了，所以不用考虑
-->
<template>
  <div class="star" :class="starType">
    <span v-for="(item,index) in styleArray"
      :class="item"
      class="star-item"
      :key="index"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  data () {
    return {};
  },
  components: {},
  computed: {
    starType() {
      return 'star-' + this.size;
    },
    styleArray() {
      let result = [];
      // 得出 0.5 的倍数
      let score = Math['floor'](this.score * 2) / 2;
      // 得出是否包含小数(半星)
      let hasDecimal = (score % 1) !== 0;
      let countOn = Math['floor'](this.score);
      for (let i = 0; i < countOn; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='stylus' ref='stylesheet/stylus'>
  @import "../../common/stylus/mixin.styl"
  .star
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right 0
        &.on
          bg-image('./img/star48_on')
        &.half
          bg-image('./img/star48_half')
        &.off
          bg-image('./img/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./img/star36_on')
        &.half
          bg-image('./img/star36_half')
        &.off
          bg-image('./img/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./img/star24_on')
        &.half
          bg-image('./img/star24_half')
        &.off
          bg-image('./img/star24_off')
</style>
