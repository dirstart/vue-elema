<template>
  <div class="rating-select">
    <!-- 三项评价 -->
    <div class="rating-type border-1px">
      <span class="block positive" @click="changeSelect(2, $event)" :class="{'active': selectType===2}">
        {{desc.all}}
        <span class="count">
          {{ratings.length}}
        </span>
      </span>
      <span class="block positive" @click="changeSelect(0, $event)" :class="{'active': selectType===0}">
        {{desc.positive}}
        <span class="count">
          {{positives.length}}
        </span>
      </span>
      <span class="block negative" @click="changeSelect(1, $event)" :class="{'active': selectType===1}">
        {{desc.negative}}
        <span class="count">
          {{negatives.length}}
        </span>
      </span>
    </div>
    <!-- 是否只看有内容的 -->
    <div @click="toggleContent" class="content-switch" :class="{'on': onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return [];
      }
    },
    // 只看好的，只看不好的，全部的 选项
    selectType: {
      type: Number,
      default: ALL
    },
    // 只看有评价内容的
    onlyContent: {
      type: Boolean,
      default: false
    },
    // 展示文案可配置
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  data () {
    return {};
  },
  components: {},
  computed: {
    positives () {
      return this.ratings.filter(item => {
        return item.rateType === POSITIVE;
      });
    },
    negatives () {
      return this.ratings.filter(item => {
        return item.rateType === NEGATIVE;
      });
    }
  },
  mounted() {},
  methods: {
    // 是否只看有内容的评价
    toggleContent (event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('change-only-content');
    },
    // 选择某一类的评价
    changeSelect (type, event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('change-select-type', type);
    }
  }
};
</script>
<style lang='stylus' ref='stylesheet/stylus'>
  @import "../../common/stylus/mixin.styl"
  .rating-select
    .rating-type
      padding 18px 0
      // 底部有根 border 线，所以这里的 左右间距 使用 margin
      margin 0 18px
      border-1px(rgba(7, 17, 27, .1))
      font-size 0
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        line-height 16px
        border-radius 1px
        font-size 12px
        color rgb(77, 85, 93)
        .count
          margin-left 2px
          font-size 8px
        &.active
          color #fff
        &.positive
          background rgba(0, 160, 220, .2)
          &.active
            background rgb(0, 160, 220)
        &.negative
          background rgba(77, 85, 93, .2)
          &.active
            background rgb(77, 85, 93)
    .content-switch
      color #089e8a
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      color rgb(147, 153, 159)
      font-size 0
      .icon-check_circle
        display inline-block
        vertical-align top
        margin-right 4px
        font-size 24px
      &.on
        .icon-check_circle
          color: #00c850
      .text
        display inline-block
        vertical-align top
        font-size 12px
</style>
